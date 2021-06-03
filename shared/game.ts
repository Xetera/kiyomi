import { z } from "zod";

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
};

type PublicEventsKeys = "auth";

export type IncomingMessageData = typeof Messages;

type PublicEvents = Pick<IncomingMessageData, PublicEventsKeys>;
// The ping event is checked separately. This is a bit of a problem
// because both anons and registered users are supposed to be pinging
// but I can't be bothered to implement a nice system for that lol
type PrivateEvents = Omit<IncomingMessageData, PublicEventsKeys | "p">;

export type IncomingMessageType = keyof IncomingMessageData;
export type PublicIncomingMessageType = keyof PublicEvents;
export type PrivateIncomingMessageType = keyof PrivateEvents;

export type IncomingMessage = {
  t: IncomingMessageType;
} & IncomingMessageData[IncomingMessageType];

export type KnownIncomingMessage<T extends IncomingMessageType> = {
  t: T;
} & IncomingMessageData[T];

export type KnownOutgoingMessage<T extends OutgoingMessageType> = {
  t: T;
  state?: RoomS;
} & OutgoingMessageData[T];

export type RevealedAnswer = {
  idol: RevealedNuguChoice;
  users: PlayerS[];
};

// OUTGOING MESSAGES
type UserAnswerPayload = {
  answers: RevealedAnswer[];
  correct_answer: RevealedNuguChoice;
};

export type OutgoingMessageData = {
  p: {};
  error: { message: string };
  // these must not be shown to the user
  // but should be logged on the client side
  technical_error: { message: string };
  created_room: { room: RoomS };
  joined_room: { room: RoomS } | { error: string };
  connect: { seat: SeatS };
  disconnect: { seat: SeatS };
  force_disconnected: { reason: string };
  starting: { secs: number };
  round_start: { idol: NuguPrompt; secs: number };
  game_end: {};
  user_answer: { user_id: string } | { user_id: string; choice: number };
  // fired when a user answers and gets the results revealed to them
  answers_reveal: UserAnswerPayload;
  round_end: UserAnswerPayload;
  idol_list: { idols: NuguChoice[] };
  auth: { success: boolean };
};

export const stateExempt: (keyof OutgoingMessageData)[] = [
  "error",
  "starting",
  "p",
];

export type OutgoingMessageType = keyof OutgoingMessageData;

export type OutgoingMessage = {
  t: OutgoingMessageType;
  state?: RoomS;
} & OutgoingMessageData[OutgoingMessageType];

export class ClientError {
  constructor(public message: string) {}
}

export class ClientTechnicalError {
  constructor(public message: string) {}
}

export type RoomS = {
  id: string;
  owner: string;
  seats: { [uuid: string]: SeatS };
  secondsPerRound: number;
};

export type PlayerS = {
  id: string;
  username: string;
  ult?: string;
  image?: string;
};

export type SeatS = {
  // answere: boolean,
  // id of the users current answer
  answer?: number;
  answered: boolean;
  points: number;
  player: PlayerS;
};

export const difficulties = {
  easy: {
    idolPool: 85,
    time: 6,
  },
  medium: {
    idolPool: 120,
    time: 6,
  },
  hard: {
    idolPool: 200,
    time: 6,
  },
} as const;

export type DifficultyLevels = keyof typeof difficulties;

export type NuguChoice = {
  // userId: string
  idolId: number;
  stageName: string;
  fullName?: string | null;
  group?: string;
};

export type RevealedNuguChoice = NuguChoice & { image: string };

export type NuguPrompt = {
  slug: string;
};

export type UserNuguChoice = NuguChoice & {
  image: string;
  userId: string;
};
