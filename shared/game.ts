import { z } from "zod"
import { SearchResponseHit } from "typesense/lib/Typesense/Documents"
import { IndexedGroup, IndexedPerson } from "./search"

export const clientPerson = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string().optional(),
  aliases: z.array(z.string()),
  preferredAlias: z.optional(z.string()),
  preferredGroupName: z.optional(z.string()),
  group: z.optional(z.number()),
})

export const PartialClientPerson = z.object({
  id: z.number(),
  name: z.string(),
  aliases: z.array(z.string()),
})

export type ClientPerson = z.infer<typeof clientPerson>

export const clientFace = z.object({
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
})

export const revealedPerson = z.object({
  person: clientPerson,
  faces: z.array(clientFace),
})

export type RevealedPerson = z.infer<typeof revealedPerson>

const clientImage = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
  faces: z.array(
    z.object({
      id: z.number(),
      x: z.number(),
      y: z.number(),
      width: z.number(),
      height: z.number(),
    })
  ),
})

export type ClientImage = z.infer<typeof clientImage>

export const clientPlayer = z.object({
  id: z.number(),
  username: z.string(),
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
  started: z.boolean(),
  selectedPeople: z.number(),
})

export type ClientRoomPreview = z.infer<typeof clientRoomPreview>

const seatState = z.union([
  z.object({
    type: z.literal("waitingForGame"),
  }),
  z.object({
    type: z.literal("answering"),
  }),
  z.object({
    type: z.literal("waitingForNextRound"),
    answer: z.number().optional(),
  }),
])

export type SeatState = z.infer<typeof seatState>
export const clientSeat = z.object({
  state: seatState,
  owner: z.boolean(),
  answered: z.boolean(),
  points: z.number(),
  player: clientPlayer,
})

export type ClientSeat = z.infer<typeof clientSeat>

export const commonSearch = z.object({
  id: z.string(),
  name: z.string(),
  aliases: z.array(z.string()),
})

export const clientSearchGroup = commonSearch.merge(
  z.object({
    groupId: z.number(),
    members: z.array(z.number()),
  })
)

export type ClientSearchGroup = z.infer<typeof clientSearchGroup>

export type MeiliResult<T> = {
  hits: T[]
}

export const clientSearchPerson = commonSearch.merge(
  z.object({
    personId: z.number(),
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

export const revealedAnswerVote = z.object({
  userId: z.number(),
  usedHint: z.boolean(),
})

export type RevealedAnswerVote = z.infer<typeof revealedAnswerVote>

export const revealedAnswer = z.object({
  // we want to emit the full known data since we have
  // the authoritative information on each person and
  // don't want the client to have to re-fetch stuff
  person: clientPerson,
  users: z.array(revealedAnswerVote),
})

const hints = z.union([
  z.literal("alwaysOn"),
  z.literal("pointCost"),
  z.literal("limited"),
  z.literal("disabled"),
])

const roomState = z.union([
  z.object({
    type: z.literal("creating"),
  }),
  z.object({
    type: z.literal("answering"),
  }),
  z.object({
    type: z.literal("waitingForNextRound"),
    correctAnswer: clientPerson,
    answers: z.array(revealedAnswer),
    waitSeconds: z.number(),
    imageSlug: z.string(),
  }),
])

export type RoomState = z.infer<typeof roomState>

export const clientRoom = z.object({
  slug: z.string(),
  state: roomState,
  type: gameType,
  name: z.string(),
  started: z.boolean(),
  coordination: z.number().optional(),
  owner: clientPlayer.optional(),
  selections: z.record(personPool),
  seats: z.array(clientSeat),
  countdownLength: z.number(),
  hints,
  secondsPerRound: z.number(),
  imagePoolSize: z.number(),
  maxRoundCount: z.number().default(5),
})

export type ClientRoom = z.infer<typeof clientRoom>

export type GameSelections = z.infer<typeof clientRoom>["selections"]

export type Hints = z.infer<typeof hints>

const editRoom = {
  personIds: z.array(z.number()),
  timeLimit: z.number().min(3).max(30).default(10).optional(),
  hints,
}

/**
 * Incoming messages
 */
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
  pick_round_count: z.object({
    count: z.number(),
  }),
  pick_hints: z.object({ hints }),
  edit_room: z.object({
    ...editRoom,
  }),
  join_room: z.object({
    room: z.string().nonempty(),
  }),
  hint: z.object({}),
  // pick_person: pickPerson,
  rooms: z.object({}),
  leave_room: z.object({}),
  answer: z.object({ id: z.number().nonnegative() }),
  start_game: z.object({}),
  auth: z.object({ token: z.string() }),
} as const

type DistributeClientMessage<U> = U extends IncomingMessageType
  ? { t: U } & z.infer<typeof Messages[U]>
  : never

export const publicEvents = ["auth", "rooms"] as const
export type PublicEventsKeys = typeof publicEvents[number]

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

export const clientRound = z.object({
  state: roomState,
  image: clientImage,
  number: z.number(),
  secs: z.number(),
  scores: z.record(z.number()),
})

export type ClientRound = z.infer<typeof clientRound>

export type RevealedAnswer = z.infer<typeof revealedAnswer>

const userAnswerPayload = z.object({
  room: clientRoom,
  people: z.array(revealedPerson),
  imageViews: z.number(),
  correctAnswer: clientPerson,
  answers: z.array(revealedAnswer),
  nextRoundWait: z.number(),
})

export const personChoice = z.object({
  personId: z.number(),
  // count: z.number(),
})

export type PersonChoice = z.infer<typeof personChoice>

// OUTGOING MESSAGES
export type UserAnswerPayload = z.infer<typeof userAnswerPayload>

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
  image_counts: z.object({ count: z.number(), coordinationId: z.number() }),
  room_update: z.object({
    room: clientRoom,
    coordinationId: z.number().optional(),
  }),
  hint: z.object({
    // null when the person being guessed has no preferred group
    groupName: z.string().optional(),
    aliases: z.array(z.string()).optional(),
  }),
  rooms: z.object({ rooms: z.array(clientRoomPreview) }),
  users_update: z.object({ seats: z.array(clientSeat) }),
  connect: z.object({ seat: clientSeat }),
  disconnect: z.object({ seat: clientSeat }),
  force_disconnected: z.object({ reason: z.string() }),
  starting: z.object({ secs: z.number() }),
  started: z.object({}),
  new_leader: z.object({ seat: clientSeat }),
  round_start: z.object({
    round: clientRound,
  }),
  game_end: z.object({}),
  user_answer: z.union([
    z.object({ userId: z.number() }),
    z.object({ userId: z.number(), choice: z.number() }),
  ]),
  answers_reveal: userAnswerPayload,
  round_end: userAnswerPayload,
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
  groups: SearchResponseHit<IndexedGroup>[],
  members: SearchResponseHit<IndexedPerson>[]
): Record<number, PersonPool> {
  const out: Record<number, PersonPool> = {}
  for (const group of groups) {
    const filtered = members
      .filter((member) =>
        member.document.groups.includes(group.document.groupId)
      )
      .map((e) => e.document)
    out[group.document.groupId] = {
      group: group.document,
      members: filtered,
    }
  }
  return out
}

export type PartialSearchResult = {
  group: IndexedGroup
  members?: IndexedPerson[]
}
