import * as uWS from "uWebSockets.js"
// @ts-ignore
import Hashids from "hashids/cjs"
import { logger } from "./config"
import jsonwebtoken from "jsonwebtoken"
import {
  serializePerson,
  serializePlayer,
  serializeRoom,
  serializeSeat,
} from "./serialization"
import {
  ClientError,
  ClientTechnicalError,
  IncomingMessage,
  Messages,
  OutgoingMessage,
  OutgoingMessageType,
  PrivateIncomingMessageType,
  stateExempt,
  RevealedAnswer,
  outgoingMessageData,
  IncomingMessageArgs,
  IncomingMessageData,
} from "~/shared/game"
import {
  Anon,
  CommandContext,
  Context,
  MessageHandlers,
  Player,
  EmittedMessage,
  GameType,
  ClientPerson,
  PrivateMessageHandlers,
  PublicMessageHandlers,
  Room,
  Seat,
  Sender,
  Server,
  Difficulty,
  ServerPerson,
} from "./messaging"
import { keyBy } from "lodash"
import dotenv from "dotenv"
import { createPublishers } from "./events"
import { Group, Person } from "~/shared/backend"
import {
  fetchAllImages,
  fetchAllPeople,
  getGroupAppearanceCounts,
} from "./query"
import { backend } from "~/shared/sdk"

const idFactory = new Hashids("salt!")

const DEFAULT_START_TIMEOUT = 2
const DEFAULT_ROUND_WAIT_TIME = 3

const server: Server = {
  // ????????????
  incrementing: 0,
  rooms: {
    nugu: new Map<string, Room>(),
  },
}

const players = new WeakMap<uWS.WebSocket, Player>()
const anons = new WeakMap<uWS.WebSocket, Anon>()

function clearFromOtherRooms(player: Player) {
  server.rooms.nugu.forEach((otherRoom) => {
    otherRoom.seats.delete(player.id)
  })
}

function joinRoom(player: Player, room: Room): Seat {
  clearFromOtherRooms(player)

  if (room.seats.size >= room.maxSeats) {
    throw new ClientError("Room is full")
  }

  const seat: Seat = {
    get answered() {
      return Boolean(seat.answer)
    },
    player,
  }

  room.seats.set(player.id, seat)

  player.room = room
  player.seat = seat
  return seat
}

function leaveRoom(player: Player, room: Room) {
  clearFromOtherRooms(player)
  // might be doubling here idk
  room.seats.delete(player.id)
}

interface CreateRoomOptions {
  player: Player
  groupIds: number[]
  difficulty: Difficulty
}

async function createRoom(
  { player, groupIds, difficulty }: CreateRoomOptions,
  game: GameType
): Promise<Room> {
  // TODO: making nugu rooms by default
  const id = idFactory.encode(server.incrementing++)
  const people = await backend.query({
    people: [
      { where: { memberOf: { some: { groupId: { in: groupIds } } } } },
      {
        id: true,
      },
    ],
  })
  const imagePool = await fetchAllImages()

  const room = {
    id,
    type: game,
    seats: new Map(),
    // might change in the future? should be plenty for now though
    round: 1,
    difficulty,
    maxRounds: 20,
    choices: {},
    // getting the first 20 relevant results
    artistPool: artists,
    roundStarted: false,
    get started() {
      return this.round !== 1 || this.roundStarted
    },
    maxSeats: 50,
    broadcast<T extends OutgoingMessageType>(
      message: EmittedMessage<T>,
      except?: string
    ) {
      this.seats.forEach((seat) => {
        if (except && seat.player.id === except) return
        send(seat.player.sock, message)
      })
    },
    broadcastSplit({ pred, yes, no, except }) {
      this.seats.forEach((seat) => {
        if (except && seat.player.id === except) return
        if (pred(seat)) {
          send(seat.player.sock, yes)
        } else {
          send(seat.player.sock, no)
        }
      })
    },
    // a little bit of type hackery here, we need the seat reference
  } as Room
  server.rooms[game].set(id, room)
  room.owner = joinRoom(player, room)
  return room
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

function send<T extends keyof typeof outgoingMessageData>(
  ws: uWS.WebSocket,
  o: EmittedMessage<T>
) {
  const player: Anon | Player | undefined = players.get(ws) || anons.get(ws)
  if (!player) {
    throw Error("Tried to emit to a player who doesn't exist")
  }

  const out: OutgoingMessage = o

  if (player.room && !stateExempt.includes(o.t)) {
    out.state = serializeRoom(player.room)
  }

  const payload = JSON.stringify(out)
  logger.debug(
    `Sending payload of length ${payload.length} to [${
      isPlayer(player) ? player.id : "Anon"
    }]`
  )
  ws.send(payload)
}

function createSender(ws: uWS.WebSocket): Sender {
  return function <T extends OutgoingMessageType>(o: EmittedMessage<T>) {
    return send(ws, o)
  }
}

function spliceRandom<T>(elements: T[]): T {
  const random = Math.floor(Math.random() * elements.length)
  // we might have to get this to exclude stuff
  const reference = elements[random]
  elements.splice(random, 1)
  return reference
}

function getRevealedAnswerPayload(
  ctx: CommandContext
): EmittedMessage<"answers_reveal"> {
  const answers = getRevealedAnswers(ctx)
  const person = ctx.people.get(String(ctx.room.correctAnswer.id))
  if (!person) {
    const error = `The correct answer in room ${ctx.room.id} was an artist that's not in the artist registry`
    logger.error(error)
    throw Error(error)
  }
  logger.info("Sending answer reveal")
  return {
    t: "answers_reveal",
    answers,
    correctAnswer: toRevealedPerson(person),
  }
}

function startRound(ctx: CommandContext) {
  // resetting the previous round's answers back to nothing
  for (const seat of ctx.room.seats.values()) {
    seat.answer = undefined
  }
  const prompt = spliceRandom(ctx.room.imagePool)
  // const { time } = difficulties.easy
  ctx.room.roundStarted = true
  ctx.room.correctAnswer = prompt.answer
  const secs = ctx.room.difficulty.timePerRound
  ctx.room.broadcast({
    t: "round_start",
    person: {
      slug: person._image!.slug,
    },
    // TODO: make this dependent on the state of the game
    secs,
  })
  ctx.room.endingTimeout = setTimeout(() => {
    endRound(ctx)
  }, secs * 1000)
}

function endRound(ctx: CommandContext) {
  clearTimeout(ctx.room.endingTimeout)
  ctx.room.roundStarted = false
  // TODO: choose winners of round
  ctx.room.round++
  const payload = getRevealedAnswerPayload(ctx)
  ctx.room.broadcast(payload)
  if (ctx.room.round >= ctx.room.maxRounds) {
    return finishGame(ctx)
  }
  setTimeout(() => {
    startRound(ctx)
  }, DEFAULT_ROUND_WAIT_TIME * 1000)
}

function finishGame(ctx: CommandContext) {
  ctx.room.broadcast({
    t: "game_end",
  })
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
        all[chosenartist.id].push(userId)
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
      // .map((userId) => ctx.room.seats.get(userId)?.player)
      // .filter((a) => a)
      // .map((player) => player.id serializePlayer(player as Player)),
    }
  })
}

function sendPeople(player: Player, people: ServerPerson[]) {
  const serialized = people.map(serializePerson)
  send(player.sock, {
    t: "personList",
    people: serialized,
  })
}

function disconnectOwner(player: Player) {
  const { seat, room } = player
  if (!room || !seat) {
    throw new ClientError("You're not in a room")
  }

  if (seat === room.owner) {
    room.broadcast(
      {
        t: "force_disconnected",
        reason: "Owner left the room",
      },
      player.id
    )
    room.seats.clear()
    server.rooms[room.type].delete(room.id)
    return
  }

  room.seats.delete(player.id)
  room.broadcast(
    { t: "disconnect", seat: serializeSeat(seat, room) },
    player.id
  )
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
    room: ctx.player.room,
    seat: ctx.player.seat,
    people: ctx.people,
  }
}

export const privateMessageHandlers: PrivateMessageHandlers = {
  async create_room({ reply, player, args }) {
    // only nugu game for now
    if (args.game !== "nugu") {
      return reply({ t: "error", message: "No such game mode" })
    }
    // TODO: turn this into something that can be adjusted later (not during creation)
    const room = await createRoom(
      {
        player,
        groupsIds: args.groupIds,
        difficulty: {
          timePerRound: args.timeLimit,
          pool: [] as Group[],
        },
      },
      args.game
    )
    reply({ t: "created_room", room: serializeRoom(room) })
  },
  async pickGroup({ args, ...rest }) {
    const ctx = commandCtx(rest)
    const newGroups = ctx.room.groupPool.map((p) => p.id).concat([args.groupId])
    ctx.room.groupChoice = await getGroupAppearanceCounts(newGroups)
    ctx.room.broadcast({
      t: "pickGroup",
      groups: ctx.room.groupChoice,
    })
  },
  leave_room({ player }) {
    // We are assuming that the client doesn't
    // need confirmation to know that they left
    // the room
    return disconnectOwner(player)
  },
  join_room({ player, reply, args }) {
    const room = server.rooms.nugu.get(args.room)
    if (!room) {
      return reply({
        t: "joined_room",
        error: `Room ${args.room} does not exist`,
      })
    }
    const playerAlreadyInRoom = room.seats.has(player.id)
    if (playerAlreadyInRoom) {
      return reply({ t: "joined_room", error: "You're already in this room" })
    }

    if (room.started) {
      return reply({
        t: "joined_room",
        error: "This room has already started the game",
      })
    }

    const seat = joinRoom(player, room)
    reply({ t: "joined_room", room: serializeRoom(room) })
    room.broadcast({ t: "connect", seat: serializeSeat(seat, room) }, player.id)
  },
  start_game(data) {
    const { ...ctx } = data
    const { player } = ctx
    const { room, people, seat } = commandCtx(data)

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

    room.broadcast({ t: "starting", secs: DEFAULT_START_TIMEOUT })
    setTimeout(() => {
      startRound({ room, people, seat })
    }, DEFAULT_START_TIMEOUT * 1000)
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

    // if (args.id == ctx.room.correctAnswer.id) {
    //   ctx.seat.points++
    // }

    const hasEveryoneAnswered = [...ctx.room.seats.values()].every((seat) =>
      Boolean(seat.answer)
    )

    if (hasEveryoneAnswered) {
      return endRound(ctx)
    }

    reply(getRevealedAnswerPayload(ctx))
    // if the user sending packets has not answered yet they should
    // not see the other user's answer
    ctx.room.broadcastSplit({
      pred: (seat) => Boolean(seat.answer),
      yes: { t: "user_answer", userId: player.id, choice: args.id },
      no: { t: "user_answer", userId: player.id },
      except: player.id,
    })
  },
}

const publicMessageHandlers: PublicMessageHandlers = {
  async auth({ anon, reply, args }) {
    const ws = anon.sock
    if (players.has(anon.sock)) {
      reply({ t: "auth", success: false })
      throw new ClientTechnicalError("You are already authenticated")
    }
    const jwt = jsonwebtoken.verify(args.token, process.env.JWT_SECRET!)
    if (typeof jwt === "string") {
      reply({ t: "auth", success: false })
      throw new ClientTechnicalError("The token is a string...?")
    }
    anons.delete(ws)
    const id = (jwt as any).user_id as string
    const { user } = await backend.query({
      user: [
        { id: Number(id) },
        { id: true, slug: true, avatar: true, name: true },
      ],
    })
    if (!user) {
      return
    }
    const { avatar, name } = user
    const player = createPlayer({
      id,
      username: name ?? "Unknown Player",
      image: avatar,
      sock: ws,
      token: args.token,
    })
    players.set(ws, player)
    reply({ t: "auth", success: true })
    logger.info("Authed a user")
  },
}

const port = 9002

const publicEvents = new Set<keyof MessageHandlers>(["auth"])

async function main() {
  setInterval(() => {
    logger.info(`STATS: ${server.rooms.nugu.size} NUGU rooms`)
  }, 1000 * 60 * 10)

  const people = await fetchAllPeople()
  const mappedPeople = new Map(
    Object.entries(keyBy(people, (person) => person.id))
  )

  const app = uWS.App()

  const publish = createPublishers(app)

  app
    .ws("/*", {
      compression: 0,
      maxPayloadLength: 16 * 1024 * 1024,
      idleTimeout: 100,
      maxBackpressure: 1024,
      open(ws) {
        anons.set(ws, {
          sock: ws,
        })
      },
      message: async (ws, message) => {
        const data: IncomingMessage = JSON.parse(
          Buffer.from(message).toString()
        )
        const { t, ...rest } = data
        const player = players.get(ws)
        const anon = anons.get(ws)
        const reply = createSender(ws)
        const sharedContext = {
          args: rest,
          ws,
          reply,
          player,
          people: mappedPeople,
        } as Context
        if (t === "p") {
          return reply({ t: "p" })
        }
        if (publicEvents.has(t)) {
          const target = anon || player
          if (!target) {
            throw Error(
              "A player who isn't registered anywhere attempted to make a request"
            )
          }
          const args = Messages.auth.parse(rest)
          return publicMessageHandlers.auth({
            ...sharedContext,
            args,
            anon: target,
          })
        }
        if (anon) {
          throw reply({
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
        // zod doesn't work here? :(
        const args = Messages[t as PrivateIncomingMessageType].parse(rest)
        try {
          await handler({
            ...sharedContext,
            player,
            args: args as any,
          })
        } catch (err) {
          if (err instanceof ClientError) {
            return void send(ws, { t: "error", message: err.message })
          }
          if (err instanceof ClientTechnicalError) {
            return void send(ws, {
              t: "technical_error",
              message: err.message,
            })
          }
          void send(ws, {
            t: "error",
            message: "Something went wrong... try again later",
          })
          logger.error(err)
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      drain: (ws) => {
        // TODO: ?
      },
      close: (ws) => {
        const player = players.get(ws)
        if (!player) {
          return logger.error(
            "A player was already removed before disconnecting"
          )
        }

        if (!player.room || !player.seat) {
          return
        }

        const seat = serializeSeat(player.seat)
        leaveRoom(player, player.room)
        if (player.room.owner === player.seat) {
          disconnectOwner(player)
        }
        player.room.broadcast({ t: "disconnect", seat })
        anons.delete(ws)
        players.delete(ws)
      },
    })
    .options("/*", (res) => {
      res.writeHeader("Access-Control-Allow-Origin", "*").end()
    })
    .any("/*", (res) => {
      res
        .writeStatus("302")
        .writeHeader("Location", "https://dev.kiyomi.io/group/79/(G)I-DLE")
        .writeHeader("Access-Control-Allow-Origin", "*")
        .end()
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
