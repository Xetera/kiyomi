import {
  clientPerson,
  Hints,
  IncomingMessageData,
  IncomingMessageType,
  outgoingMessageData,
  OutgoingMessageType,
  PersonChoice,
  PrivateIncomingMessageType,
  PublicIncomingMessageType,
  RevealedPerson,
  RoomState,
  SeatState,
} from "../../shared/game"
import { z } from "zod"
import type { Face, Group, Image, Person } from "../../shared/backend/schema"
import * as uWS from "uWebSockets.js"

export type ServerGroup = Pick<Group, "name" | "id"> & {
  aliases: Array<{ name: string }>
}

export type ServerPerson = Pick<Person, "name" | "id"> & {
  avatar?: {
    thumbnail: {
      large: string
    }
  }
  aliases: Array<{
    name: string
  }>
  preferredAlias?: { name: string }
  preferredMembership?: {
    group: ServerGroup
  }
  memberOf: Array<{
    group: ServerGroup
  }>
}

export type GuessingPrompt = {
  face: Pick<Face, "x" | "y" | "width" | "height">
  people: RevealedPerson[]
  image: Pick<Image, "id" | "slug" | "views"> & {
    width: number
    height: number
    thumbnail: {
      large: string
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

type UserId = number

export type Anon = {
  sock: uWS.WebSocket
  room?: Room
  seat?: Seat
}

export type Player = Anon & {
  id: number
  token: string
  username: string
  image?: string
  // ult?: string
}

export type Context = {
  app: uWS.TemplatedApp
  ws: uWS.WebSocket
  player: Player
  reply: Sender
  people: Map<string, ServerPerson>
}

export type CommandContext = {
  app: uWS.TemplatedApp
  room: Room
  people: People
  seat: Seat
  log(data: any): void
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
  state: SeatState
  player: Player
  owner: boolean
  hintUsed: boolean
  imageLoaded: boolean
  readonly answered: boolean
  readonly score: number
}

// For some reason using `Omit` here messes up the export type inference so we gotta be repetitive
export type EmittedMessage<T extends OutgoingMessageType> = {
  t: T
} & z.infer<typeof outgoingMessageData[T]>

export type QuestionAnswer = {
  answer: number
  answerDate: Date
  answerMs: number
  hintUsed: boolean
}

export type PastQuestion = {
  imageId: number
  correctId: number
  answers: Map<UserId, QuestionAnswer>
}

export type Difficulty = {
  timePerRound: number
  hints: Hints
}

export type Room = {
  id: string
  state: RoomState
  name: string
  // used for synchronizing asynchronous events that are related to each other
  coordination?: number
  seats: Map<number, Seat>
  owner?: Seat
  type: GameType
  joinOrder: Seat[]
  round: number
  difficulty: Difficulty
  started: boolean
  maxSeats: number
  maxRounds: number
  deleteTimer?: number
  roundStart?: Date
  endingTimeout?: ReturnType<typeof setTimeout>
  imagePrepareTimeout?: ReturnType<typeof setTimeout>
  cleanupTimer?: ReturnType<typeof setTimeout>
  correctAnswer: number
  // personChoice: number[]
  // groupPool: Group[]
  personPool: number[]
  imagePool: GuessingPrompt[]
  choices: { [personId: string]: number }
  history: PastQuestion[]
  broadcastWith<T extends OutgoingMessageType>(
    t: T,
    // @ts-ignore
    opts: (seat: Seat) => z.infer<typeof outgoingMessageData[T]> | undefined
  ): void
}

export type Rooms = {
  nugu: Map<string, Room>
  spotify: Map<string, Room>
}

export type Server = {
  isShuttingDown: boolean
  incrementing: number
  rooms: Rooms
}

export type GameType = keyof Rooms
