import {
  IncomingMessageData,
  IncomingMessageType,
  outgoingMessageData,
  OutgoingMessageType,
  PersonChoice,
  PrivateIncomingMessageType,
  PublicIncomingMessageType,
} from "../../shared/game"
import { z } from "zod"
import type {
  Face,
  Group,
  GroupMember,
  Image,
  Person,
} from "../../shared/backend/schema"
import * as uWS from "uWebSockets.js"

export const clientPerson = z.object({
  id: z.number(),
  name: z.string(),
  aliases: z.array(z.string()),
  group: z.optional(z.number()),
})

export type ClientPerson = z.infer<typeof clientPerson>

export type ServerGroup = Pick<Group, "name" | "id"> & {
  aliases: Array<{ name: string }>
}

export type ServerPerson = Pick<Person, "name" | "id"> & {
  aliases: Array<{
    name: string
  }>
  preferredMembership?: {
    group: ServerGroup
  }
  memberOf: Array<{
    group: ServerGroup
  }>
}

export type GuessingPrompt = {
  face: Pick<Face, "x" | "y" | "width" | "height">
  image: Pick<Image, "id" | "slug"> & {
    thumbnail: {
      medium: string
      small: string
    }
  }
  answer: ServerPerson
}

export const clientGroup = z.object({
  id: z.number(),
  name: z.string(),
  aliases: z.array(z.string()),
  // group: z.optional(z.number()),
})

export type ClientGroup = z.infer<typeof clientGroup>

type UserId = string

export type Anon = {
  sock: uWS.WebSocket
  room?: Room
  seat?: Seat
}

export type Player = Anon & {
  id: Uuid
  token: string
  username: string
  image?: string
  // ult?: string
}

export type Context = {
  ws: uWS.WebSocket
  player: Player
  reply: Sender
  people: Map<string, ServerPerson>
}

export type CommandContext = {
  room: Room
  people: People
  seat: Seat
}

export type Sender = <T extends OutgoingMessageType>(
  o: EmittedMessage<T>
) => void

export type HandlerArgs<T extends IncomingMessageType> = {
  args: z.infer<IncomingMessageData[T]>
} & Context

export type PublicHandlerArgs<T extends PublicIncomingMessageType> = {
  args: z.infer<IncomingMessageData[T]>
}

type AnonArgs<T extends PublicIncomingMessageType> = PublicHandlerArgs<T> & {
  ws: uWS.WebSocket
  anon: Anon | Player
  reply: Sender
}

export type PublicMessageHandlers = {
  [T in PublicIncomingMessageType]: (args: AnonArgs<T>) => Promise<void> | void
}

export type PrivateMessageHandlers = {
  [T in PrivateIncomingMessageType]: (
    args: HandlerArgs<T>
  ) => Promise<void> | void
}

export type MessageHandlers = PublicMessageHandlers & PrivateMessageHandlers

// export const people = z.map(z.string(), clientPerson)
export type People = Map<string, ServerPerson> //z.infer<typeof people>

export const clientPeople = z.record(clientPerson)
export type ClientPeople = z.infer<typeof clientPeople>

export type Uuid = string

/**
 * A seat is a player's state within the game
 */
export type Seat = {
  player: Player
  answer?: number
  hintUsed: boolean
  readonly answered: boolean
  readonly score: number
}

// For some reason using `Omit` here messes up the export type inference so we gotta be repetitive
export type EmittedMessage<T extends OutgoingMessageType> = {
  t: T
} & z.infer<typeof outgoingMessageData[T]>

export type QuestionAnswer = {
  answer: number
  hintUsed: boolean
}

export type PastQuestion = {
  imageId: number
  correctId: number
  answers: Map<UserId, QuestionAnswer>
}

export type Difficulty = {
  timePerRound: number
}

export type Room = {
  id: string
  seats: Map<Uuid, Seat>
  owner: Seat
  type: GameType
  round: number
  difficulty: Difficulty
  started: boolean
  roundStarted: boolean
  maxSeats: number
  maxRounds: number
  endingTimeout?: ReturnType<typeof setTimeout>
  correctAnswer: number
  personChoice: PersonChoice[]
  // groupPool: Group[]
  personPool: number[]
  imagePool: GuessingPrompt[]
  choices: { [personId: string]: number }
  history: PastQuestion[]
  broadcast<T extends OutgoingMessageType>(
    message: EmittedMessage<T>,
    except?: string
  ): void
  broadcastWith<T extends OutgoingMessageType>(
    t: T,
    opts: (seat: Seat) => z.infer<typeof outgoingMessageData[T]> | undefined
  ): void
}

export type Rooms = {
  nugu: Map<string, Room>
}

export type Server = {
  incrementing: number
  rooms: Rooms
}

export type GameType = keyof Rooms
