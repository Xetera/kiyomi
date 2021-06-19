import { z } from "zod"
import { clientGroup } from "../game/src/messaging"
export const clientPerson = z.object({
  id: z.number(),
  name: z.string(),
  aliases: z.array(z.string()),
  group: z.optional(z.number()),
})

export type ClientPerson = z.infer<typeof clientPerson>

export const nuguPrompt = z.object({
  slug: z.string(),
})

export type NuguPrompt = z.infer<typeof nuguPrompt>

export const clientPlayer = z.object({
  id: z.number(),
  username: z.string(),
  // ult?: z.optional(z.string()),
  imageUrl: z.optional(z.string()),
})

export type ClientPlayer = z.infer<typeof clientPlayer>

export const gameType = z.union([z.literal("nugu"), z.literal("spotify")])

export const clientRoomPreview = z.object({
  slug: z.string(),
  name: z.string(),
  type: gameType,
  players: z.array(clientPlayer),
  maxPlayers: z.number(),
  selectedPeople: z.number(),
})

export type ClientRoomPreview = z.infer<typeof clientRoomPreview>

export const clientSeat = z.object({
  // answere: boolean,
  // id of the users current answer
  answer: z.optional(z.number()),
  owner: z.boolean(),
  answered: z.boolean(),
  points: z.number(),
  player: clientPlayer,
})

export type ClientSeat = z.infer<typeof clientSeat>

export const clientSearchGroup = z.object({
  id: z.number(),
  name: z.string(),
  aliases: z.array(z.string()),
})

export type ClientSearchGroup = z.infer<typeof clientSearchGroup>

export type MeiliResult<T> = {
  hits: T[]
}

export const clientSearchPerson = clientSearchGroup.merge(
  z.object({
    groups: z.array(z.number()),
  })
)

export const personPool = z.object({
  group: clientSearchGroup,
  members: z.array(clientSearchPerson),
})

export type ClientSearchPerson = z.infer<typeof clientSearchPerson>

export type PersonPool = z.infer<typeof personPool>

export type AugmentedSearchResultBackend = {
  group: ClientSearchGroup
  members: ClientSearchPerson[]
}

const hints = z.union([
  z.literal("alwaysOn"),
  z.literal("pointCost"),
  z.literal("limited"),
  z.literal("disabled"),
])

export const clientRoom = z.object({
  slug: z.string(),
  type: gameType,
  name: z.string(),
  owner: z.number(),
  selections: z.record(personPool),
  seats: z.record(clientSeat),
  hints,
  secondsPerRound: z.number(),
})

export type ClientRoom = z.infer<typeof clientRoom>

export type GameSelections = z.infer<typeof clientRoom>["selections"]

export type Hints = z.infer<typeof hints>

const editRoom = {
  personIds: z.array(z.number()),
  timeLimit: z.number().min(3).max(30).default(10).optional(),
  hints,
}

export const Messages = {
  p: z.object({}),
  create_room: z.object({
    type: z.string().nonempty().default("nugu"),
  }),
  toggle_people: z.object({
    people: z.array(z.number()),
  }),
  pick_time: z.object({
    seconds: z.number(),
  }),
  pick_hints: z.object({ hints }),
  edit_room: z.object({
    ...editRoom,
  }),
  join_room: z.object({
    room: z.string().nonempty(),
  }),
  // pick_person: pickPerson,
  rooms: z.object({}),
  leave_room: z.object({}),
  answer: z.object({ id: z.number().nonnegative() }),
  start_game: z.object({}),
  auth: z.object({ token: z.string() }),
}

type DistributeClientMessage<U> = U extends IncomingMessageType
  ? { t: U } & z.infer<typeof Messages[U]>
  : never

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

// export type IncomingMessage = z.infer<typeof Messages.>
export type IncomingMessage = DistributeClientMessage<IncomingMessageType>

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

export const personChoice = z.object({
  personId: z.number(),
  // count: z.number(),
})

export type PersonChoice = z.infer<typeof personChoice>

// OUTGOING MESSAGES
type UserAnswerPayload = z.infer<typeof userAnswerPayload>

export const outgoingMessageData = {
  p: z.object({}),
  error: z.object({ message: z.string() }),
  // these must not be shown to the user
  // but should be logged on the client side
  technical_error: z.object({ message: z.string() }),
  created_room: z.object({ room: clientRoom }),
  joined_room: z.union([
    z.object({ room: clientRoom }),
    z.object({ error: z.string() }),
  ]),
  room_update: z.object({ room: clientRoom }),
  rooms: z.object({ rooms: z.array(clientRoomPreview) }),
  users_update: z.object({ seats: z.array(clientSeat) }),
  connect: z.object({ seat: clientSeat }),
  disconnect: z.object({ seat: clientSeat }),
  force_disconnected: z.object({ reason: z.string() }),
  starting: z.object({ secs: z.number() }),
  new_leader: z.object({ seat: clientSeat }),
  round_start: z.object({
    person: nuguPrompt,
    secs: z.number(),
    scores: z.record(z.number()),
  }),
  game_end: z.object({}),
  user_answer: z.union([
    z.object({ userId: z.number() }),
    z.object({ userId: z.number(), choice: z.number() }),
  ]),
  // fired when a user answers and gets the results revealed to them,
  answers_reveal: userAnswerPayload,
  // fired when everyone
  round_end: userAnswerPayload,
  // person_list: z.object({ people: z.array(clientPerson) }),
  auth: z.object({ success: z.boolean() }),
} as const

export const stateExempt: (keyof typeof outgoingMessageData)[] = [
  "error",
  "starting",
  "p",
]

export type OutgoingMessageType = keyof typeof outgoingMessageData

// really weird hack but it doesn't work without this for some reason
type DistributeServerMessage<U> = U extends OutgoingMessageType
  ? { t: U } & z.infer<typeof outgoingMessageData[U]>
  : never

export type OutgoingMessage = DistributeServerMessage<OutgoingMessageType>

export class ClientError {
  constructor(public message: string) {}
}

export class ClientTechnicalError {
  constructor(public message: string) {}
}
export const AUTH_COOKIE_NAME = "next-auth.session-token"

export type AugmentedSearchResultFrontend = {
  group: ClientSearchGroup
  members?: ClientSearchPerson[]
}

export function buildAugmentedResults(
  groups: ClientSearchGroup[],
  members: ClientSearchPerson[]
): Record<number, PersonPool> {
  const out: Record<number, PersonPool> = {}
  for (const group of groups) {
    const filtered = members.filter((member) =>
      member.groups.includes(group.id)
    )
    out[group.id] = {
      group,
      members: filtered,
    }
  }
  return out
}

export type PartialSearchResult = {
  group: ClientSearchGroup
  members?: ClientSearchPerson[]
}
