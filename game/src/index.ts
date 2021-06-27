import * as uWS from "uWebSockets.js"
import Hashids from "hashids"
import { logger } from "./config"
import jose from "jose"
import ms from "ms"
import cookie from "cookie"
import {
  serializeRoom,
  serializeRoomPreview,
  serializeSeat,
} from "./serialization"
import {
  AUTH_COOKIE_NAME,
  ClientError,
  ClientTechnicalError,
  IncomingMessage,
  Messages,
  OutgoingMessage,
  outgoingMessageData,
  OutgoingMessageType,
  PrivateIncomingMessageType,
  RevealedAnswer,
  stateExempt,
} from "../../shared/game"
import {
  Anon,
  CommandContext,
  Context,
  Difficulty,
  EmittedMessage,
  GameType,
  MessageHandlers,
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
import { TemplatedApp } from "uWebSockets.js"
import { randomInt, randomUUID } from "crypto"
import { Topic, topics } from "./pubsub"

const idFactory = new Hashids("salt!")

export const DEFAULT_START_TIMEOUT = 4
export const DEFAULT_ROUND_WAIT_TIME = 6

const server: Server = {
  // ????????????
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
  console.log({ joinOrder: room.joinOrder })
}

function clearFromOtherRooms(player: Player) {
  server.rooms.nugu.forEach((otherRoom) => {
    otherRoom.seats.delete(player.id)
  })
}

function answerCount(an: QuestionAnswer, room: Room) {
  if (an.hintUsed) {
    return 0.5
  }
  return room.correctAnswer === an.answer ? 1 : 0
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
    owner: isOwner,
    hintUsed: false,
    get answered(): boolean {
      return Boolean(seat.answer)
    },
    get score(): number {
      return room.history.slice(0, room.round).reduce(
        (all, round) =>
          // I'm sorry for this war crime I just comitted
          all +
          Number(round.answers.get(player.id)?.answer === round.correctId),
        0
      )
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
  subscribe(player.sock, topics.room(room.id))
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
    type: game,
    seats: new Map(),
    joinOrder: [],
    // might change in the future? should be plenty for now though
    round: 0,
    name: generateRoomName(player),
    difficulty,
    maxRounds: 20,
    history: [] as PastQuestion[],
    choices: {},
    imagePool: [],
    endingTimeout: undefined,
    correctAnswer: -1,
    personPool: personIds,
    roundStarted: false,
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
  topic: string,
  o: EmittedMessage<T>
) {
  if ("isClosed" in ws && ws.isClosed) {
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

function getRevealedAnswerPayload(
  ctx: CommandContext
): EmittedMessage<"answers_reveal"> {
  const answers = getRevealedAnswers(ctx)
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
    nextRoundWait: DEFAULT_ROUND_WAIT_TIME,
    correctAnswer: toRevealedPerson(person),
  }
}

function currentQuestion(ctx: CommandContext) {
  return ctx.room.imagePool[ctx.room.round]
}

function startRound(ctx: CommandContext) {
  // resetting the previous round's answers back to nothing
  for (const seat of ctx.room.seats.values()) {
    seat.hintUsed = false
    seat.answer = undefined
  }
  const prompt = currentQuestion(ctx)
  if (!prompt) {
    throw new Error("End of the prompt?")
  }

  ctx.room.started = true
  ctx.room.roundStarted = true
  ctx.room.correctAnswer = prompt.answer.id
  const secs = ctx.room.difficulty.timePerRound
  publish(ctx.app, topics.room(ctx.room.id), {
    t: "round_start",
    round: {
      number: ctx.room.round,
      // TODO: too low quality maybe? Don't wanna send an uncompressed image though
      imageUrl: prompt.image.thumbnail.medium,
      face: prompt.face,
      secs,
      scores: Object.fromEntries(
        Array.from(ctx.room.seats.values(), (seat) => [
          seat.player.id,
          seat.score,
        ])
      ),
    },
  })
  // we don't want to send users unnecessary events during games
  for (const seat of ctx.room.seats.values()) {
    unsubscribe(seat.player.sock, topics.rooms())
  }
  ctx.room.endingTimeout = setTimeout(() => {
    endRound(ctx)
  }, secs * 1000)
}

function endRound(ctx: CommandContext) {
  if (ctx.room.endingTimeout) {
    clearTimeout(ctx.room.endingTimeout)
  }
  ctx.room.roundStarted = false
  const round = ctx.room.imagePool[ctx.room.round]
  if (!round) {
    throw new Error(
      `Room in ${ctx.room.round} exceeded the maximum number of images allowed`
    )
  }
  ctx.room.history.push({
    correctId: round.answer.id,
    imageId: round.image.id,
    answers: new Map(
      [...ctx.room.seats.values()]
        .filter((seat) => seat.answer)
        .map((seat) => [
          seat.player.id,
          { answer: seat.answer as number, hintUsed: seat.hintUsed },
        ])
    ),
  })
  // TODO: choose winners of round
  ctx.room.round++
  const payload = getRevealedAnswerPayload(ctx)
  publish(ctx.app, topics.room(ctx.room.id), payload)
  if (ctx.room.round >= ctx.room.maxRounds) {
    return finishGame(ctx)
  }

  for (const seat of ctx.room.seats.values()) {
    unsubscribe(seat.player.sock, topics.answers(ctx.room.id))
  }
  setTimeout(() => {
    startRound(ctx)
  }, DEFAULT_ROUND_WAIT_TIME * 1000)
}

function finishGame(ctx: CommandContext) {
  // ctx.room.broadcast({
  //   t: "game_end",
  // })

  for (const seat of ctx.room.seats.values()) {
    subscribe(seat.player.sock, topics.rooms())
  }
}

function toRevealedPerson(artist: ServerPerson): number {
  return artist.id
}

function getRevealedAnswers(ctx: CommandContext): RevealedAnswer[] {
  const userAnswers = Array.from(ctx.room.seats.values()).reduce(
    (all, seat) => {
      if (!seat.answer) {
        console.log(`${seat.player.username} has no answer`)
        return all
      }

      const chosenartist = ctx.people.get(String(seat.answer))
      if (!chosenartist) {
        throw new Error(
          "A user was able to pick an answer that doesn't exist in the artist pool"
        )
      }
      const userId = Number(seat.player.id)
      if (all[chosenartist.id]) {
        all[chosenartist.id]?.push(userId)
      } else {
        all[chosenartist.id] = [userId]
      }
      return all
    },
    {} as Record<number, number[]>
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

function nukeRoom(room: Room) {
  room.seats.clear()
  server.rooms[room.type].delete(room.id)
}

async function disconnectPlayer(
  player: Player,
  relevantSocket: uWS.TemplatedApp | uWS.WebSocket
) {
  const { seat, room } = player
  if (!room || !seat) {
    throw new ClientError("You're not in a room")
  }

  const lastPersonLeft = room.seats.size === 1
  if (lastPersonLeft) {
    if (room.started) {
      nukeRoom(room)
      return
    }
    room.owner = undefined
    room.name = `Unclaimed room`
    setTimeout(() => {
      nukeRoom(room)
    }, 1000 * 60 * 5)
  } else if (seat.player.id === room.owner?.player.id) {
    console.log("Transferring ownership")
    const transferEligible = room.joinOrder.filter((seat) =>
      room.seats.has(seat.player.id)
    )
    console.log({ transferEligible })
    const newOwner = transferEligible[0]
    if (!newOwner) {
      console.log("Owner is not in join order, impossible state. Exiting game")
      nukeRoom(room)
      publish(relevantSocket, `room/${room.id}`, {
        t: "force_disconnected",
        reason:
          "Unrecoverable server side error, disconnecting from game. SORRY!",
      })
      return
    }
    console.log(room.joinOrder)

    room.owner = newOwner
    newOwner.owner = true
    room.name = generateRoomName(newOwner.player)
    publish(relevantSocket, `room/${room.id}`, {
      t: "new_leader",
      seat: serializeSeat(newOwner, room),
    })
  }

  clearFromOtherRooms(player)
  publish(relevantSocket, `room/${room.id}`, {
    t: "disconnect",
    seat: serializeSeat(seat, room),
  })
  publish(relevantSocket, `room/${room.id}`, {
    t: "room_update",
    room: await serializeRoom(room),
  })
  publish(relevantSocket, `room/${room.id}`, {
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

    publish(ctx.ws, `room/${cmd.room.id}`, {
      t: "room_update",
      room: await serializeRoom(cmd.room),
      coordinationId: cmd.room.coordination,
    })
  }
}

async function emitImagePool(room: Room, app: uWS.TemplatedApp) {
  const imagePool = shuffle(await fetchAllImages(room.personPool))
  console.log({ imagePool })
  room.imagePool = imagePool
  if (!room.coordination) {
    console.warn("Image pool was edited without a coordination id")
  }
  publish(app, `room/${room.id}`, {
    t: "image_counts",
    count: imagePool.length,
    coordinationId: room.coordination ?? -1,
  })
}

export const privateMessageHandlers: PrivateMessageHandlers = {
  async rooms({ ws, reply }) {
    // we might have previously unsubscribed from games
    subscribe(ws, topics.rooms())
    reply({ t: "rooms", rooms: activeRooms() })
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
          timePerRound: 10,
        },
      } as CreateRoomOptions,
      args.type
    )
    server.rooms[args.type].set(room.id, room)
    reply({ t: "created_room", room: await serializeRoom(room) }),
      publish(ws, "rooms", { t: "rooms", rooms: activeRooms() })
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
    return withRoomEdit(async (cmd) => {
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
    publish(app, `room/${room.id}`, {
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
    ].find((room) =>
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
    publish(ws, "rooms", { t: "rooms", rooms: activeRooms() })
    publish(ws, `room/${room.id}`, {
      t: "users_update",
      seats: Array.from(room.seats.values()).map((seat) =>
        serializeSeat(seat, room)
      ),
    })
  },
  async start_game(data) {
    const { player } = data
    const ctx = commandCtx(data)
    const { room, people, seat } = ctx

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

    publish(data.app, `room/${room.id}`, {
      t: "starting",
      secs: DEFAULT_START_TIMEOUT,
    })
    setTimeout(() => {
      publish(data.app, `room/${room.id}`, { t: "started" })
      startRound(ctx)
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
  answer({ args, ...rest }) {
    const { player, reply } = rest
    const ctx = commandCtx(rest)

    if (Number.isNaN(args.id)) {
      throw new ClientTechnicalError("Argument 'id' must be a valid number")
    }

    if (!ctx.room.roundStarted) {
      throw new ClientError("Round has not started yet")
    }

    ctx.seat.answer = args.id

    const hasEveryoneAnswered = [...ctx.room.seats.values()].every((seat) =>
      Boolean(seat.answer)
    )

    if (hasEveryoneAnswered) {
      return endRound(ctx)
    }

    subscribe(rest.ws, topics.answers(ctx.room.id))

    reply(getRevealedAnswerPayload(ctx))
    // if the user sending packets has not answered yet they should
    // not see the other user's answer
    ctx.room.broadcastWith("user_answer", (seat) => {
      if (seat.player.id === player.id) {
        return
      }
      return seat.answer
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
    user: [{ id: Number(id) }, { id: true, avatar: true, name: true }],
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
  // authorization happens only once upon connections in order to make
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

const publicEvents = new Set<keyof MessageHandlers>(["auth", "rooms"])

let allPeople = new Map<string, ServerPerson>()

console.log("running code")

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
      logger.error(err)
    }
  }

  const app = uWS.App()

  setInterval(fetchNewPeople, ms("6h"))

  await fetchNewPeople()

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
        let args: z.infer<typeof Messages[typeof t]>
        try {
          // zod doesn't work here? :(
          args = await Messages[t as keyof typeof Messages].parseAsync(rest)
        } catch (err) {
          logger.error(err)
          return send(ws, { t: "error", message: err })
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
        if (t === "auth") {
          console.log({ t })
          try {
            const args = Messages.auth.parse(rest)
            return await publicMessageHandlers.auth({
              ...sharedContext,
              args,
            })
          } catch (err) {
            logger.error(err)
            if (process.env.NODE_ENV === "production") {
              return reply({ t: "error", message: "Invalid token" })
            } else {
              return reply({ t: "error", message: err })
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
          logger.error(err)
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
        publish(app, `room/${player.room.id}`, { t: "disconnect", seat })
        disconnectPlayer(player, app)
        publish(app, "rooms", { t: "rooms", rooms: activeRooms() })

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
        console.log("Listening to port " + port)
      } else {
        console.log("Failed to listen to port " + port)
      }
    })
}

main()

process.on("unhandledRejection", (err) => {
  console.error(err)
  process.exit(1)
})
