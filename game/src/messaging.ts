import {
  DifficultyLevels,
  IncomingMessageData,
  IncomingMessageType,
  NuguChoice,
  OutgoingMessageData,
  OutgoingMessageType,
  PrivateIncomingMessageType,
  PublicIncomingMessageType,
} from '~/shared/game';
import * as uWS from 'uWebSockets.js';

export type Anon = {
  sock: uWS.WebSocket;
  room?: Room;
  seat?: Seat;
};

export type Player = Anon & {
  id: Uuid;
  token: string;
  username: string;
  image?: string;
  ult?: string;
};

export type Context = {
  ws: uWS.WebSocket;
  player: Player;
  reply: Sender;
  artists: artists;
  allartists: artist[];
};

export type CommandContext = {
  room: Room;
  seat: Seat;
  artists: artists;
};

export type Sender = <T extends OutgoingMessageType>(
  o: EmittedMessage<T>
) => void;

export type HandlerArgs<T extends IncomingMessageType> = {
  args: IncomingMessageData[T];
} & Context;

export type PublicHandlerArgs<T extends PublicIncomingMessageType> = {
  args: IncomingMessageData[T];
};

type AnonArgs<T extends PublicIncomingMessageType> = PublicHandlerArgs<T> & {
  ws: uWS.WebSocket;
  anon: Anon | Player;
  reply: Sender;
  allartists: artist[];
};

export type PublicMessageHandlers = {
  [T in PublicIncomingMessageType]: (args: AnonArgs<T>) => Promise<void> | void;
};

export type PrivateMessageHandlers = {
  [T in PrivateIncomingMessageType]: (
    args: HandlerArgs<T>
  ) => Promise<void> | void;
};

export type MessageHandlers = PublicMessageHandlers & PrivateMessageHandlers;

export type artist = artistsWithImagesQuery['artists'][0];
export type artists = Map<string, artist>;
export type Uuid = string;

/**
 * A seat is a player's state within the game
 */
export type Seat = {
  player: Player;
  points: number;
  answer?: number;
  answered: boolean;
};

// For some reason using `Omit` here messes up the export type inference so we gotta be repetitive
export type EmittedMessage<T extends OutgoingMessageType> = {
  t: T;
} & OutgoingMessageData[T];

type SplitBroadcastArgs<T extends OutgoingMessageType> = {
  pred: (seat: Seat) => boolean;
  yes: EmittedMessage<T>;
  no: EmittedMessage<T>;
  except?: string;
};

export type Room = {
  id: string;
  seats: Map<Uuid, Seat>;
  owner: Seat;
  type: GameType;
  difficulty: DifficultyLevels;
  round: number;
  started: boolean;
  roundStarted: boolean;
  maxSeats: number;
  maxRounds: number;
  endingTimeout: ReturnType<typeof setTimeout>;
  correctAnswer: artist;
  artistPool: artist[];
  choices: { [artist_id: string]: NuguChoice };
  broadcast<T extends OutgoingMessageType>(
    message: EmittedMessage<T>,
    except?: string
  ): void;
  broadcastSplit<T extends OutgoingMessageType>(
    opts: SplitBroadcastArgs<T>
  ): void;
};

export type Rooms = {
  nugu: Map<string, Room>;
};

export type Server = {
  incrementing: number;
  rooms: Rooms;
};

export type GameType = keyof Rooms;
