import "dotenv/config"
import * as uWS from "uWebSockets.js"
import Hashids from "hashids"
import {
  DEFAULT_ROUND_WAIT_TIME,
  DEFAULT_START_TIMEOUT,
  logger,
} from "./config"
import jose from "jose"
import ms from "ms"
import cookie from "cookie"
import {
  promptImageUrl,
  serializeImage,
  serializePerson,
  serializeRoom,
  serializeRoomPreview,
  serializeRound,
  serializeSeat,
} from "./serialization"
import {
  AUTH_COOKIE_NAME,
  ClientError,
  ClientPerson,
  ClientTechnicalError,
  IncomingMessage,
  Messages,
  outgoingMessageData,
  OutgoingMessageType,
  PrivateIncomingMessageType,
  PublicEventsKeys,
  RevealedAnswer,
  RevealedAnswerVote,
} from "../../shared/game"
import {
  Anon,
  CommandContext,
  Context,
  Difficulty,
  EmittedMessage,
  GameType,
  GuessingPrompt,
  PastQuestion,
  Player,
  PrivateMessageHandlers,
  PublicMessageHandlers,
  QuestionAnswer,
  Room,
  Rooms,
  Seat,
  Sender,
  Server,
  ServerPerson,
} from "./messaging"
import { shuffle } from "lodash"
import {
  fetchAllImages,
  fetchAllPeople,
  getGroupAppearanceCounts,
} from "./query"
import { backend } from "../../shared/sdk"
import { z } from "zod"
import { randomInt } from "crypto"
import { Topic, topics } from "./pubsub"

const idFactory = new Hashids("salt!")

const server: Server = {
  isShuttingDown: false,
  // This is an incrementing number for seeding
  // the name of the room
  incrementing: 0,
  rooms: {
    nugu: new Map<string, Room>(),
    spotify: new Map<string, Room>(),
  },
}

function addToRoomJoinOrder(room: Room, seat: Seat) {
  const hasJoinedPrior = room.joinOrder.some(
    (existing) => existing.player.id === seat.player.id
  )
  if (hasJoinedPrior) {
    // we wanna move the player to the front of the join order if they reconnected
    room.joinOrder = room.joinOrder.filter(
      (existing) => existing.player.id !== seat.player.id
    )
  }
  room.joinOrder.push(seat)
}

function clearFromOtherRooms(player: Player) {
  server.rooms.nugu.forEach((otherRoom) => {
    otherRoom.seats.delete(player.id)
  })
}

export function answerPointWorth(
  an: QuestionAnswer,
  correctId: number
): number {
  if (an.hintUsed) {
    return 0.5
  }
  return correctId === an.answer ? 1 : 0
}

type JoinRoomOptions = {
  isOwner: boolean
}

function joinRoom(
  player: Player,
  room: Room,
  { isOwner }: JoinRoomOptions
): Seat {
  if (room.seats.size >= room.maxSeats) {
    throw new ClientError("Room is full")
  }

  clearFromOtherRooms(player)
  clearTimeout(room.deleteTimer)

  const seat: Seat = {
    state: { type: "waitingForGame" },
    owner: isOwner,
    hintUsed: false,
    imageLoaded: false,
    get answered(): boolean {
      return (
        seat.state.type === "waitingForNextRound" &&
        seat.state.answer !== undefined
      )
    },
    get score(): number {
      const score = room.history.reduce((all, history, i) => {
        const answer = history.answers.get(player.id)
        if (!answer) {
          return all
        }
        return all + answerPointWorth(answer, history.correctId)
      }, 0)
      return score
    },
    player,
  }

  if (isOwner) {
    room.owner = seat
    room.name = generateRoomName(player)
  }

  room.seats.set(player.id, seat)
  addToRoomJoinOrder(room, seat)

  player.room = room
  player.seat = seat
  subscribeToAllRoomEvents(room, player)
  return seat
}

function subscribe(ws: uWS.WebSocket, topic: Topic) {
  if (ws.isClosed) {
    return
  }
  ws.subscribe(topic)
}

function unsubscribe(ws: uWS.WebSocket, topic: Topic) {
  if (ws.isClosed) {
    return
  }
  ws.unsubscribe(topic)
}

interface CreateRoomOptions {
  player: Player
  personIds: number[]
  difficulty: Difficulty
}

const generateRoomName = (player: Player) => `${player.username}'s Room`

async function createRoom(
  { player, difficulty, personIds }: CreateRoomOptions,
  game: GameType
): Promise<Room> {
  // TODO: making nugu room by default
  const id = idFactory.encode(server.incrementing++)

  const room: Omit<Room, "owner"> = {
    id,
    state: { type: "creating" },
    type: game,
    seats: new Map(),
    joinOrder: [],
    // might change in the future? should be plenty for now though
    round: 0,
    name: generateRoomName(player),
    difficulty,
    maxRounds: 10,
    history: [] as PastQuestion[],
    choices: {},
    imagePool: [],
    endingTimeout: undefined,
    correctAnswer: -1,
    personPool: personIds,
    started: false,
    maxSeats: 50,
    broadcastWith(t, f) {
      room.seats.forEach((seat) => {
        const out = f(seat)
        if (!out) {
          return
        }
        send(seat.player.sock, { t, ...out })
      })
    },
  }
  // a little bit of type hackery here, we need the seat reference
  const roomOwner = joinRoom(player, room as Room, { isOwner: true })
  ;(room as Room).owner = roomOwner
  return room as Room
}

function createPlayer(player: Player) {
  return {
    // ...DEFAULT_PLAYER,
    ...player,
  }
}

function isPlayer(anon: Anon): anon is Player {
  return "id" in anon
}

function publish<T extends keyof typeof outgoingMessageData>(
  ws: uWS.WebSocket | uWS.TemplatedApp,
  topic: Topic,
  o: EmittedMessage<T>
) {
  if ("isClosed" in ws && ws.isClosed) {
    logger.info(
      `Not publishing event ${topic} to ${ws.player.id} because the connection is closed`
    )
    return
  }
  ws.publish(topic, JSON.stringify(o))
}

function send<T extends keyof typeof outgoingMessageData>(
  ws: uWS.WebSocket,
  o: EmittedMessage<T>
) {
  if (ws.isClosed) {
    return
  }

  const payload = JSON.stringify(o)
  logger.debug(
    `Sending payload of length ${payload.length} to [${
      ws.player && isPlayer(ws.player) ? ws.player.id : "Anon"
    }]`
  )
  ws.send(payload)
}

function createSender(ws: uWS.WebSocket): Sender {
  return function <T extends OutgoingMessageType>(o: EmittedMessage<T>) {
    return send(ws, o)
  }
}

async function getRevealedAnswerPayload(
  ctx: CommandContext
): Promise<EmittedMessage<"answers_reveal">> {
  const answers = getRevealedAnswers(ctx)
  const question = currentQuestion(ctx)
  const person = ctx.people.get(String(ctx.room.correctAnswer))
  if (!person) {
    const error = `The correct answer in room ${ctx.room.id} was an artist that's not in the artist registry`
    logger.error(error)
    throw Error(error)
  }
  logger.info("Sending answer reveal")
  return {
    t: "answers_reveal",
    answers,
    people: question.people,
    imageViews: question.image.views,
    room: await serializeRoom(ctx.room),
    nextRoundWait: DEFAULT_ROUND_WAIT_TIME,
    correctAnswer: toRevealedPerson(person),
  }
}

function currentQuestion(ctx: CommandContext): GuessingPrompt | undefined {
  return ctx.room.imagePool[ctx.room.round]
}

function prepareForRound(ctx: CommandContext) {
  const prompt = currentQuestion(ctx)
  if (!prompt) {
    throw new Error("End of the prompt?")
  }

  ctx.room.started = false
  ctx.room.state = {
    type: "loadingImages",
    imageUrl: promptImageUrl(prompt),
  }

  // resetting the previous round's answers back to nothing
  for (const seat of ctx.room.seats.values()) {
    seat.hintUsed = false
    seat.state = {
      type: "loadingImage",
    }
  }

  ctx.room.seats.forEach((seat) => {
    console.log(seat.player.username, seat.player.sock.getTopics())
  })
  const imagePrepareTopic = topics.prepareImages(ctx.room.id)
  console.log(imagePrepareTopic)
  publish(ctx.app, imagePrepareTopic, {
    t: "image_prepare",
    round: serializeRound(ctx.room, {
      type: "imageHint",
      url: promptImageUrl(prompt),
    }),
  })

  const timeoutMs = 3000
  logger.info(`Preparing for round, ${timeoutMs}ms timeout`)
  ctx.room.imagePrepareTimeout = setTimeout(() => {
    startRound(ctx)
  }, timeoutMs)
}

function startRound(ctx: CommandContext) {
  ctx.room.started = true
  ctx.room.state = {
    type: "answering",
  }

  const prompt = currentQuestion(ctx)
  if (!prompt) {
    throw Error("no prompt")
  }

  ctx.room.correctAnswer = prompt.answer.id
  const secs = ctx.room.difficulty.timePerRound
  publish(ctx.app, topics.room(ctx.room.id), {
    t: "round_start",
    round: serializeRound(ctx.room, serializeImage(prompt)),
  })
  // we don't want to send users unnecessary events during games
  for (const seat of ctx.room.seats.values()) {
    unsubscribe(seat.player.sock, topics.rooms())
  }
  const timeoutMs = secs * 1000
  ctx.room.roundStart = new Date()
  ctx.room.endingTimeout = setTimeout(() => {
    endRound(ctx)
  }, timeoutMs)
  ctx.log(`Set a timeout for ${timeoutMs} ms`)
}

async function endRound(ctx: CommandContext) {
  const roundStartDate = ctx.room.roundStart
  const correctPerson = allPeople.get(String(ctx.room.correctAnswer))
  const question = currentQuestion(ctx)
  if (!correctPerson) {
    throw Error(
      `The correct answer for round was not in the person DB ${ctx.room.correctAnswer}`
    )
  }
  ctx.room.state = {
    type: "waitingForNextRound",
    imageSlug: question.image.slug,
    correctAnswer: serializePerson(correctPerson),
    answers: getRevealedAnswers(ctx),
    waitSeconds: DEFAULT_ROUND_WAIT_TIME,
  }
  if (ctx.room.endingTimeout) {
    clearTimeout(ctx.room.endingTimeout)
  }
  const round = currentQuestion(ctx)
  if (!round) {
    throw new Error(
      `Room in ${ctx.room.round} exceeded the maximum number of images allowed`
    )
  }
  const answers: Map<number, QuestionAnswer> = new Map(
    [...ctx.room.seats.values()].flatMap((seat) => {
      if (seat.state.type !== "waitingForNextRound") {
        return []
      }
      const { answerDate, answer } = seat.state
      const value: QuestionAnswer = {
        answer,
        answerDate,
        answerMs: roundStartDate.getTime() - answerDate.getTime(),
        hintUsed: seat.hintUsed,
      }
      return [[seat.player.id, value]]
    })
  )
  ctx.room.history.push({
    correctId: round.answer.id,
    imageId: round.image.id,
    answers,
  })

  for (const user of ctx.room.seats.values()) {
    // we only want to set users who haven't already answered
    const hasntAnswered = user.state.type !== "waitingForNextRound"
    if (hasntAnswered) {
      user.state = {
        type: "waitingForNextRound",
      }
    }
  }

  // TODO: choose winners of round
  ctx.room.round++
  const payload = await getRevealedAnswerPayload(ctx)
  publish(ctx.app, topics.room(ctx.room.id), payload)

  for (const seat of ctx.room.seats.values()) {
    unsubscribe(seat.player.sock, topics.answers(ctx.room.id))
  }

  if (ctx.room.round >= ctx.room.maxRounds) {
    return finishGame(ctx)
  }

  setTimeout(() => {
    prepareForRound(ctx)
  }, DEFAULT_ROUND_WAIT_TIME * 1000)
}

function finishGame(ctx: CommandContext) {
  for (const seat of ctx.room.seats.values()) {
    subscribe(seat.player.sock, topics.rooms())
  }
  server.rooms[ctx.room.type].delete(ctx.room.id)
  graciousCoercedShutdown(ctx)
}

function graciousCoercedShutdown(ctx: CommandContext) {
  const hasNoRunningRooms = server.rooms[ctx.room.type].size === 0
  if (server.isShuttingDown && hasNoRunningRooms) {
    logger.fatal(
      `Server is forcefully shutting down because all the games are finished`
    )
    process.exit(0)
  }
}

function toRevealedPerson(artist: ServerPerson): ClientPerson {
  return serializePerson(artist)
}

function getRevealedAnswers(ctx: CommandContext): RevealedAnswer[] {
  const userAnswers = Array.from(ctx.room.seats.values()).reduce(
    (all, seat) => {
      switch (seat.state.type) {
        case "waitingForNextRound": {
          if (seat.state.answer) {
            const chosenartist = ctx.people.get(String(seat.state.answer))
            if (!chosenartist) {
              logger.warn(
                `A user was able to pick an answer that doesn't exist in the artist pool: ${seat.state.answer}`
              )
              return all
            }
            const userId = Number(seat.player.id)
            const payload: RevealedAnswerVote = {
              userId,
              usedHint: seat.hintUsed,
            }
            if (all[chosenartist.id]) {
              all[chosenartist.id]?.push(payload)
            } else {
              all[chosenartist.id] = [payload]
            }
          }
          return all
        }
        default:
          return all
      }
    },
    {} as Record<number, RevealedAnswerVote[]>
  )
  // TODO: optimize this? idk
  return Object.entries(userAnswers).map(([artistId, users]) => {
    const id = Number(artistId)
    const person = ctx.people.get(String(id))
    if (!person) {
      throw Error("God ")
    }
    return {
      person: toRevealedPerson(person),
      users: users,
    }
  })
}

function subscribeToAllRoomEvents(room: Room, player: Player) {
  subscribe(player.sock, topics.room(room.id))
  subscribe(player.sock, topics.prepareImages(room.id))
  // for some reason this isn't working? I don't understand why
  subscribe(player.sock, topics.roomSubEvents(room.id))
}

function unsubscribeFromAllRoomEvents(room: Room, player: Player) {
  unsubscribe(player.sock, topics.room(room.id))
  unsubscribe(player.sock, topics.prepareImages(room.id))
  unsubscribe(player.sock, topics.roomSubEvents(room.id))
}

function cleanUpRoom(room: Room) {
  room.seats.forEach((seat) => {
    unsubscribeFromAllRoomEvents(room, seat.player)
  })
  room.seats.clear()
  server.rooms[room.type].delete(room.id)
}

function nukeRoom(room: Room) {
  cleanUpRoom(room)
}

async function disconnectPlayer(
  player: Player,
  relevantSocket: uWS.TemplatedApp | uWS.WebSocket
) {
  const { seat, room } = player
  if (!room || !seat) {
    throw new ClientError("You're not in a room")
  }

  if (!room.seats.has(player.id)) {
    logger.info(
      `Player ${player.id} tried to leave room ${room.id} even though they're not in it`
    )
    return
  }
  const roomTopic = topics.room(room.id)
  const lastPersonLeft = room.seats.size === 1
  if (lastPersonLeft) {
    if (room.started) {
      nukeRoom(room)
      return
    }
    room.owner = undefined
    room.name = `Unclaimed room`
    room.cleanupTimer = setTimeout(() => {
      if (room.seats.size > 0) {
        logger.debug(
          `Not auto-nuking room ${room.id} because there are ${room.seats.size} people in it`
        )
      }
      nukeRoom(room)
    }, 1000 * 60 * 5)
  } else if (seat.player.id === room.owner?.player.id) {
    const leavingOwnerId = seat.player.id
    logger.info(
      `Transferring ownership of ${room.name} because the owner [${seat.player.username}] left`
    )
    const transferEligible = room.joinOrder.filter(
      (seat) =>
        room.seats.has(seat.player.id) && seat.player.id !== leavingOwnerId
    )

    const newOwner = transferEligible[0]
    if (!newOwner) {
      logger.error(
        `Game room is not empty but has no eligible users for ownership. Impossible state`
      )
      nukeRoom(room)
      publish(relevantSocket, roomTopic, {
        t: "force_disconnected",
        reason:
          "Unrecoverable server side error, disconnecting from game. SORRY!",
      })
      return
    }
    logger.info(`New owner: ${newOwner.player.username}`)

    room.owner = newOwner
    newOwner.owner = true
    room.name = generateRoomName(newOwner.player)
    publish(relevantSocket, roomTopic, {
      t: "room_update",
      room: await serializeRoom(room),
      coordinationId: room.coordination,
    })
  }

  clearFromOtherRooms(player)
  publish(relevantSocket, roomTopic, {
    t: "disconnect",
    seat: serializeSeat(seat, room),
  })
  publish(relevantSocket, roomTopic, {
    t: "room_update",
    room: await serializeRoom(room),
  })
  publish(relevantSocket, roomTopic, {
    t: "users_update",
    seats: Array.from(room.seats.values()).map((seat) =>
      serializeSeat(seat, room)
    ),
  })
}

function commandCtx(ctx: Context): CommandContext {
  if (!ctx.player.room) {
    throw new ClientError("You must be in a room to do this")
  }
  if (!ctx.player.seat) {
    logger.error(
      `A player ${ctx.player.id} who is in a room is not in a seat? This should never happen`
    )
    throw new ClientError("You must be in a room to do this")
  }
  return {
    app: ctx.app,
    room: ctx.player.room,
    seat: ctx.player.seat,
    people: ctx.people,
    log(data: any) {
      logger.debug(`[${ctx.player.room.id}] [${ctx.player.id}] ${data}`)
    },
  }
}

function withRoomEdit(f: (cmd: CommandContext) => Promise<void> | void) {
  return async (ctx: Context) => {
    const { reply } = ctx

    const cmd = commandCtx(ctx)
    if (cmd.room.owner?.player.id !== ctx.player.id) {
      return reply({
        t: "error",
        message: "You must be a room owner to change room pool.",
      })
    }
    await f(cmd)

    const room = await serializeRoom(cmd.room)
    logger.info(`Emitting update to room ${ctx.player.room.id}`)
    const roomTopic = topics.room(ctx.player.room.id)
    publish(ctx.app, roomTopic, {
      t: "room_update",
      room,
      coordinationId: cmd.room.coordination,
    })
  }
}

async function emitImagePool(room: Room, app: uWS.TemplatedApp) {
  const imagePool = shuffle(await fetchAllImages(room.personPool))
  room.imagePool = imagePool
  if (!room.coordination) {
    console.warn("Image pool was edited without a coordination id")
  }

  publish(app, topics.room(room.id), {
    t: "image_counts",
    count: imagePool.length,
    coordinationId: room.coordination ?? -1,
  })
}

export const privateMessageHandlers: PrivateMessageHandlers = {
  async image_load(ctx) {
    const command = commandCtx(ctx)
    command.seat.imageLoaded = true
    const allUserHasLoadedImage = [...command.room.seats.values()].every(
      (seat) => seat.imageLoaded
    )
    if (allUserHasLoadedImage && !command.room.started) {
      logger.info(`All users loaded image, starting round`)
      const timeout = command.room.imagePrepareTimeout
      if (timeout) {
        clearTimeout(timeout)
      }
      startRound(command)
    }
  },
  async create_room({ reply, player, args, ws }) {
    // only nugu game for now
    if (args.type !== "nugu") {
      // ok to send sock here
      return reply({ t: "error", message: "No such game mode" })
    }
    // if (args.personIds?.length === 0) {
    //   return reply({ t: "error", message: "Must select at least one person" })
    // }
    // TODO: turn this into something that can be adjusted later (not during creation)
    const room = await createRoom(
      {
        player,
        personIds: [],
        difficulty: {
          hints: "pointCost",
          timePerRound: 25,
        },
      } as CreateRoomOptions,
      args.type
    )
    server.rooms[args.type].set(room.id, room)
    reply({ t: "created_room", room: await serializeRoom(room) }),
      publish(ws, topics.rooms(), { t: "rooms", rooms: activeRooms() })
  },
  async pick_round_count(ctx) {
    const { args } = ctx
    return withRoomEdit((cmd) => {
      cmd.room.maxRounds = args.count
    })(ctx)
  },
  async pick_hints(ctx) {
    const { args } = ctx
    return withRoomEdit((cmd) => {
      cmd.room.difficulty.hints = args.hints
    })(ctx)
  },
  async pick_time(ctx) {
    const { args } = ctx
    return withRoomEdit((cmd) => {
      cmd.room.difficulty.timePerRound = args.seconds
    })(ctx)
  },
  async toggle_people(ctx) {
    const { args } = ctx
    return withRoomEdit((cmd) => {
      const { room } = cmd
      const { personPool } = room
      const selectedPeople = new Set(personPool)
      // TODO: set?
      const hasAllPeople = args.people.every((person) =>
        selectedPeople.has(person)
      )
      room.coordination = randomInt(0, 200)
      if (hasAllPeople) {
        room.personPool = room.personPool.filter(
          (f) => !args.people.includes(f)
        )
      } else {
        room.personPool = room.personPool.concat(args.people)
      }
      emitImagePool(cmd.room, ctx.app).catch((err) => {
        console.error(err)
      })
    })(ctx)
  },
  async edit_room({ args, ...rest }) {
    const { ws } = rest
    const ctx = commandCtx(rest)
    return withRoomEdit(async (cmd) => {
      ctx.room.personPool = await getGroupAppearanceCounts(args.personIds)
    })(rest)
  },
  async leave_room({ ...rest }) {
    const { player } = rest
    const { app, room } = commandCtx(rest)
    // We are assuming that the client doesn't
    // need confirmation to know that they left
    // the room
    await disconnectPlayer(player, app) // ok to send sock here
    publish(app, topics.room(room.id), {
      t: "users_update",
      seats: Array.from(room.seats.values()).map((seat) =>
        serializeSeat(seat, room)
      ),
    })
  },
  async join_room({ player, reply, args, ws }) {
    const room = server.rooms.nugu.get(args.room)
    if (!room) {
      return reply({
        t: "joined_room",
        error: `Room ${args.room} does not exist`,
      })
    }
    const playerAlreadyInOneRoom = [
      ...server.rooms.nugu.values(),
    ].some((room) =>
      [...room.seats.values()].some((seat) => seat.player.id === player.id)
    )

    if (playerAlreadyInOneRoom) {
      reply({ t: "joined_room", room: await serializeRoom(room) })
      return
    }

    if (room.started) {
      return reply({
        t: "joined_room",
        error: "This room has already started the game",
      })
    }

    // join as the owner if the room doesn't already have an owner
    joinRoom(player, room, { isOwner: !room.owner })
    reply({ t: "joined_room", room: await serializeRoom(room) })
    publish(ws, topics.rooms(), { t: "rooms", rooms: activeRooms() })
    publish(ws, topics.room(room.id), {
      t: "users_update",
      seats: Array.from(room.seats.values()).map((seat) =>
        serializeSeat(seat, room)
      ),
    })
    /**
     * No need to wait for this timer if someone joined already
     */
    if (room.cleanupTimer) {
      clearTimeout(room.cleanupTimer)
    }
  },
  async start_game(data) {
    const { player } = data
    const ctx = commandCtx(data)
    const { room } = ctx

    if (!player.seat) {
      throw new Error(
        `User ${player.id} doesn't have a seat registered despite being in a room? This should never happen`
      )
    }

    if (room.started) {
      throw new ClientError("Game has already started")
    }

    if (room.owner !== player.seat) {
      throw new ClientError("Only owners of a room are allowed to start games")
    }

    // TODO: this result is already shuffled?

    if (room.imagePool.length < room.maxRounds) {
      throw new ClientError(
        `You haven't selected enough people to play a game with ${room.maxRounds} rounds. Add more people into the pool.`
      )
    }

    publish(data.app, topics.room(room.id), {
      t: "starting",
      secs: DEFAULT_START_TIMEOUT,
    })
    setTimeout(() => {
      publish(data.app, topics.room(room.id), { t: "started" })
      prepareForRound(ctx)
    }, DEFAULT_START_TIMEOUT * 1000)
  },
  hint({ args, ...rest }) {
    const { reply, player } = rest
    const ctx = commandCtx(rest)

    if (!player.room || !player.seat) {
      throw new ClientError("You must be in a room")
    }

    const { room } = player

    if (!room.started) {
      throw new ClientError("You cannot use a hint before the game starts")
    }

    if (room.difficulty.hints === "disabled") {
      throw new ClientError("Hints are disabled for this room")
    }

    if (room.difficulty.hints === "limited") {
      const previousHints = room.history.filter(
        (question) => question.answers.get(player.id)?.hintUsed
      )
      // TODO: make this dynamic?
      if (previousHints.length >= 2) {
        throw new ClientError("You've used all your hints")
      }
    }

    player.seat.hintUsed = true
    const question = currentQuestion(ctx)

    if (!question) {
      throw new ClientError(
        "Your room doesn't have an image assigned? This shouldn't be happening"
      )
    }

    // not every group has an explicit preferred membership
    const firstMembership =
      question.answer.preferredMembership ?? question.answer.memberOf[0]
    if (!firstMembership) {
      // no groups for the person being guessed. Shouldn't happen but it could in the future
      return reply({ t: "hint" })
    }

    reply({
      t: "hint",
      groupName: firstMembership.group.name,
      aliases: firstMembership.group.aliases.map((e) => e.name),
    })
  },
  async answer({ args, ...rest }) {
    const { player, reply } = rest
    const ctx = commandCtx(rest)

    if (Number.isNaN(args.id)) {
      throw new ClientTechnicalError("Argument 'id' must be a valid number")
    }

    if (ctx.room.state.type !== "answering") {
      throw new ClientError("Round has not started yet")
    }

    ctx.seat.state = {
      type: "waitingForNextRound",
      answer: args.id,
      answerDate: new Date(),
    }

    const hasEveryoneAnswered = [...ctx.room.seats.values()].every(
      (seat) => seat.answered
    )

    if (hasEveryoneAnswered) {
      return endRound(ctx)
    }

    subscribe(rest.ws, topics.answers(ctx.room.id))

    reply(await getRevealedAnswerPayload(ctx))
    // if the user sending packets has not answered yet they should
    // not see the other user's answer
    ctx.room.broadcastWith("user_answer", (seat) => {
      if (seat.player.id === player.id) {
        return
      }
      return seat.answered
        ? { userId: player.id, choice: args.id }
        : { userId: player.id }
    })
  },
}

function activeRooms(gameType: keyof Rooms = "nugu") {
  const rooms = Array.from(server.rooms[gameType].values())

  return rooms.map((room) => serializeRoomPreview(room, gameType))
}

// the token variable is needed because for testing we have to
// call the auth function manually
async function authorize(ws: uWS.WebSocket, explicitToken?: string) {
  const token = explicitToken || ws.token
  const _signingKey = await jose.JWK.asKey(
    JSON.parse(process.env.JWT_SIGNING_KEY!)
  )
  if (!token) {
    return
  }

  const jwt = await jose.JWT.verify(token, _signingKey)
  const id = (jwt as any).sub as string
  const { user } = await backend.query({
    user: [{ id: Number(id) }, { id: true, name: true, avatar: true }],
  })
  if (!user) {
    throw new ClientError("Invalid User")
  }
  const { avatar, name } = user
  const player = createPlayer({
    id: Number(id),
    username: name ?? "Unknown Player",
    image: avatar,
    sock: ws,
    token,
  })
  ws.player = player
  return jwt
}

const publicMessageHandlers: PublicMessageHandlers = {
  async rooms({ ws, reply }) {
    // we might have previously unsubscribed from games
    subscribe(ws, topics.rooms())
    reply({ t: "rooms", rooms: activeRooms() })
  },
  // authorization happens only once upon connection in order to make
  // sure that people don't disconnect in the middle of their games
  // The auth event shouldn't be used in production. It's a way of doing
  // authentication in websocketking.com since it doesn't support auth headers
  async auth({ ws, reply, args }) {
    if (!args.token) {
      return reply({
        t: "error",
        message: "No token given, are you logged in?",
      })
    }
    if (ws.player) {
      reply({ t: "auth", success: false })
      throw new ClientTechnicalError("You are already authenticated")
    }
    try {
      await authorize(ws, args.token)
      reply({ t: "auth", success: true })
      logger.info("Authed a user")
    } catch (err) {
      reply({ t: "auth", success: false })
    }
  },
}

const port = 9002

const publicEvents = new Set<PublicEventsKeys>(["auth", "rooms"])

let allPeople = new Map<string, ServerPerson>()

async function main() {
  setInterval(() => {
    logger.info(`STATS: ${server.rooms.nugu.size} NUGU rooms`)
  }, 1000 * 60 * 10)

  async function fetchNewPeople() {
    try {
      logger.info("Refetching new people")
      const people = await fetchAllPeople()
      allPeople.clear()
      for (const person of people) {
        allPeople.set(String(person.id), person)
      }
      logger.info(`Fetched ${people.length} entries...`)
    } catch (err) {
      logger.error("Encountered an error while fetching new people")
      if (err instanceof Error) {
        logger.error(err)
      }
    }
  }

  const app = uWS.App()

  setInterval(fetchNewPeople, ms("6h"))

  fetchNewPeople()

  app
    .ws("/*", {
      compression: 0,
      // 16mb
      maxPayloadLength: 16 * 1024 * 1024,
      // 10 minutes of idle timeout
      idleTimeout: 60 * 10,
      maxBackpressure: 1024,
      upgrade(res, req, context) {
        const cookieHeader = req.getHeader("cookie")
        let token
        if (cookieHeader) {
          const cookies = cookie.parse(cookieHeader)
          token = cookies[AUTH_COOKIE_NAME]
        }
        if (server.isShuttingDown) {
          logger.debug(
            `Refusing to upgrade new connection from token {${
              token ?? "unknown"
            }} because the server is shutting down`
          )
          res.writeStatus("503").end()
          return
        }
        // https://github.com/uNetworking/uWebSockets.js/discussions/112#discussioncomment-177625
        res.upgrade(
          { token },
          req.getHeader("sec-websocket-key"),
          req.getHeader("sec-websocket-protocol"),
          req.getHeader("sec-websocket-extensions"),
          context
        )
      },
      async open(ws) {
        ws.isClosed = false
        if (ws.token) {
          logger.info(`Got a new connection with an embedded token`)
          await authorize(ws, ws.token)
        } else {
          logger.info(`Got an anonymous connection`)
          // anons.set(ws, {
          //   sock: ws,
          // })
        }
        subscribe(ws, topics.rooms())
        // sending a fresh list of room without waiting for a first emit
        send(ws, { t: "rooms", rooms: activeRooms() })
      },
      message: async (ws, message) => {
        const data: IncomingMessage = JSON.parse(
          Buffer.from(message).toString()
        )
        const { t, ...rest } = data
        if (!(t in Messages)) {
          send(ws, { t: "error", message: "Invalid event type" })
          return
        }
        // @ts-ignore
        let args: z.infer<typeof Messages[typeof t]>
        try {
          // zod doesn't work here? :(
          args = await Messages[t as keyof typeof Messages].parseAsync(rest)
        } catch (err) {
          if (err instanceof Error) {
            logger.error(err)
            return send(ws, { t: "error", message: err.message })
          }
        }
        const player = ws.player
        const reply = createSender(ws)
        const sharedContext = {
          args,
          app,
          ws,
          reply,
          player,
          people: allPeople,
        } as Context
        // ping pong
        if (t === "p") {
          return reply({ t: "p" })
        }
        if (publicEvents.has(t as PublicEventsKeys)) {
          try {
            const args = Messages[t].parse(rest)
            // @ts-ignore
            return await publicMessageHandlers[t]({
              ...sharedContext,
              args,
            })
          } catch (err) {
            if (err instanceof Error) {
              logger.error(err)
            }
            if (process.env.NODE_ENV === "production") {
              return reply({ t: "error", message: "Invalid token" })
            } else if (err instanceof Error) {
              return reply({ t: "error", message: err.message })
            }
          }
        }
        if (!ws.player) {
          return reply({
            t: "error",
            message: "You must be authorized to do that",
          })
        }
        if (!player) {
          return logger.error(
            "Got an event from a player who is not registered"
          )
        }
        const handler = privateMessageHandlers[t as PrivateIncomingMessageType]
        try {
          await handler({
            ...sharedContext,
            player,
            args: args as any,
          })
        } catch (err) {
          if (err instanceof ClientError) {
            return send(ws, { t: "error", message: err.message })
          }
          if (err instanceof ClientTechnicalError) {
            return send(ws, {
              t: "technical_error",
              message: err.message,
            })
          }
          send(ws, {
            t: "error",
            message: "Something went wrong... try again later",
          })
          if (err instanceof Error) {
            logger.error(err)
          }
        }
      },
      drain: (ws) => {
        // TODO: ?
      },
      close: (ws) => {
        ws.isClosed = true
        const player = ws.player
        if (!player) {
          return
        }

        if (!player.room || !player.seat) {
          return
        }

        player.room.joinOrder = player.room.joinOrder.filter(
          (o) => o.player.id !== player.id
        )

        const seat = serializeSeat(player.seat, player.room)
        // we can't use `ws` for emitting because it's disconnected
        publish(app, topics.room(player.room.id), { t: "disconnect", seat })
        disconnectPlayer(player, app)
        publish(app, topics.rooms(), { t: "rooms", rooms: activeRooms() })

        if (player.room.owner === player.seat) {
        }

        ws.player = undefined
      },
    })
    .options("/*", (res) => {
      res.writeHeader("Access-Control-Allow-Origin", "*").end()
    })
    .any("/*", (res) => {
      res.end("Sorry dawg but you're not a websocket")
    })
    .listen(port, (token) => {
      if (token) {
        logger.info("Listening to port " + port)
      } else {
        logger.error("Failed to listen to port " + port)
      }
    })
}

main()

process.on("SIGTERM", () => {
  logger.warn("Received a shutdown request")
  server.isShuttingDown = true
  if (process.env.NODE_DEV === "production") {
    const hasNoGames =
      server.rooms.nugu.size === 0 && server.rooms.spotify.size === 0
    if (hasNoGames) {
      logger.info(`Got a shutdown request with no active games, shutting down`)
      return process.exit(0)
    }
    logger.warn(
      "Server is in production mode, once all users disconnect the server will shut itself down"
    )
    setTimeout(() => {
      logger.error(
        `Could not gracefully shut down after 30 minutes, forcefully shutting down`
      )
      process.exit(0)
    }, 1000 * 60 * 30)
  } else {
    logger.info(`Server in development mode, killing immediately`)
    process.exit(0)
  }
})

process.on("unhandledRejection", (err) => {
  console.error(err)
  process.exit(1)
})
