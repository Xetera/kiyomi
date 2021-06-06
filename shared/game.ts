import { z } from "zod"
import { gameGroup, clientPeople, clientPerson } from "../game/src/messaging"

export const nuguPrompt = z.object({
  slug: z.string(),
})

export type NuguPrompt = z.infer<typeof nuguPrompt>

export const playerS = z.object({
  id: z.string(),
  username: z.string(),
  // ult?: z.optional(z.string()),
  imageUrl: z.optional(z.string()),
})

export type ClientPlayer = z.infer<typeof playerS>

export const seatS = z.object({
  // answere: boolean,
  // id of the users current answer
  answer: z.optional(z.number()),
  answered: z.boolean(),
  player: playerS,
})

export type ClientSeat = z.infer<typeof seatS>

export const roomS = z.object({
  id: z.string(),
  owner: z.string(),
  groupPool: gameGroup,
  seats: z.map(z.string(), seatS),
  secondsPerRound: z.number(),
})

export type ClientRoom = z.infer<typeof roomS>

export const Messages = {
  p: z.object({}),
  create_room: z.object({ game: z.string().nonempty() }),
  join_room: z.object({
    game: z.string().nonempty(),
    room: z.string().nonempty(),
  }),
  leave_room: z.object({ room: z.string().nonempty() }),
  answer: z.object({ id: z.number().nonnegative() }),
  start_game: z.object({}),
  auth: z.object({ token: z.string() }),
}

type PublicEventsKeys = "auth"

export type IncomingMessageData = typeof Messages

type PublicEvents = Pick<IncomingMessageData, PublicEventsKeys>
// The ping event is checked separately. This is a bit of a problem
// because both anons and registered users are supposed to be pinging
// but I can't be bothered to implement a nice system for that lol
type PrivateEvents = Omit<IncomingMessageData, PublicEventsKeys | "p">

export type IncomingMessageType = keyof IncomingMessageData
export type PublicIncomingMessageType = keyof PublicEvents
export type PrivateIncomingMessageType = keyof PrivateEvents

export type IncomingMessage = {
  t: IncomingMessageType
} & z.infer<IncomingMessageData[IncomingMessageType]>

export type KnownIncomingMessage<T extends IncomingMessageType> = {
  t: T
} & z.infer<IncomingMessageData[T]>

export type KnownOutgoingMessage<T extends keyof typeof outgoingMessageData> = {
  t: T
  state?: ClientRoom
} & z.infer<typeof outgoingMessageData[T]>

export const revealedAnswer = z.object({
  person: z.number(),
  users: z.array(z.number()),
})

export type RevealedAnswer = z.infer<typeof revealedAnswer>

const userAnswerPayload = z.object({
  correctAnswer: z.number(),
  answers: z.array(revealedAnswer),
})

// OUTGOING MESSAGES
type UserAnswerPayload = z.infer<typeof userAnswerPayload>

export const outgoingMessageData = {
  p: z.object({}),
  error: z.object({ message: z.string() }),
  // these must not be shown to the user
  // but should be logged on the client side
  technical_error: z.object({ message: z.string() }),
  created_room: roomS,
  joined_room: z.union([roomS, z.object({ error: z.string() })]),
  connect: z.object({ seat: seatS }),
  disconnect: z.object({ seat: seatS }),
  force_disconnected: z.object({ reason: z.string() }),
  starting: z.object({ secs: z.number() }),
  round_start: z.object({ person: nuguPrompt, secs: z.number() }),
  game_end: z.object({}),
  user_answer: z.union([
    z.object({ userId: z.string() }),
    z.object({ userId: z.string(), choice: z.number() }),
  ]),
  // fired when a user answers and gets the results revealed to them,
  answers_reveal: userAnswerPayload,
  // fired when everyone
  round_end: userAnswerPayload,
  personList: z.object({ people: z.array(clientPerson) }),
  auth: z.object({ success: z.boolean() }),
} as const

// export type OutgoingMessageData = z.infer<typeof outgoingMessageData>

export const stateExempt: (keyof typeof outgoingMessageData)[] = [
  "error",
  "starting",
  "p",
]

export type OutgoingMessageType = keyof typeof outgoingMessageData

export type OutgoingMessage = {
  t: OutgoingMessageType
  state?: ClientRoom
} & z.infer<typeof outgoingMessageData[OutgoingMessageType]>

export class ClientError {
  constructor(public message: string) {}
}

export class ClientTechnicalError {
  constructor(public message: string) {}
}
