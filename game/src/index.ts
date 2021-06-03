import * as uWS from 'uWebSockets.js';
// @ts-ignore
import Hashids from 'hashids/cjs';
import { logger } from './config';
import jsonwebtoken from 'jsonwebtoken';
import {
  serializeartistChoice,
  serializePlayer,
  serializeRoom,
  serializeSeat,
} from './serialization';
import {
  ClientError,
  ClientTechnicalError,
  difficulties,
  IncomingMessage,
  Messages,
  OutgoingMessage,
  OutgoingMessageType,
  PrivateIncomingMessageType,
  stateExempt,
  RevealedAnswer,
  RevealedNuguChoice,
  DifficultyLevels,
} from '~/shared/game';
import {
  Anon,
  CommandContext,
  Context,
  MessageHandlers,
  Player,
  EmittedMessage,
  GameType,
  artist,
  PrivateMessageHandlers,
  PublicMessageHandlers,
  Room,
  Seat,
  Sender,
  Server,
} from './messaging';
import { keyBy } from 'lodash';
import dotenv from 'dotenv';
import { createPublishers } from './events';

const idFactory = new Hashids('salt!');

const DEFAULT_START_TIMEOUT = 2;
const DEFAULT_ROUND_WAIT_TIME = 3;

const server: Server = {
  incrementing: 0,
  rooms: {
    nugu: new Map<string, Room>(),
  },
};

const players = new WeakMap<uWS.WebSocket, Player>();
const anons = new WeakMap<uWS.WebSocket, Anon>();

function clearFromOtherRooms(player: Player) {
  server.rooms.nugu.forEach((otherRoom) => {
    otherRoom.seats.delete(player.id);
  });
}

function joinRoom(player: Player, room: Room): Seat {
  clearFromOtherRooms(player);

  if (room.seats.size >= room.maxSeats) {
    throw new ClientError('Room is full');
  }

  const seat = {
    ready: false,
    answered: false,
    points: 0,
    player,
  };

  room.seats.set(player.id, seat);

  player.room = room;
  player.seat = seat;
  return seat;
}

function leaveRoom(player: Player, room: Room) {
  clearFromOtherRooms(player);
  // might be doubling here idk
  room.seats.delete(player.id);
}

interface CreateRoomOptions {
  player: Player;
  artists: artist[];
  difficulty: DifficultyLevels;
}

function createRoom(
  { player, artists, difficulty }: CreateRoomOptions,
  game: GameType
): Room {
  // TODO: making nugu rooms by default
  const id = idFactory.encode(server.incrementing++);

  const maxartistIndex = difficulties[difficulty].artistPool;
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
    artistPool: artists.slice(0, maxartistIndex),
    roundStarted: false,
    get started() {
      return this.round !== 1 || this.roundStarted;
    },
    maxSeats: 50,
    broadcast<T extends OutgoingMessageType>(
      message: EmittedMessage<T>,
      except?: string
    ) {
      this.seats.forEach((seat) => {
        if (except && seat.player.id === except) return;
        send(seat.player.sock, message);
      });
    },
    broadcastSplit({ pred, yes, no, except }) {
      this.seats.forEach((seat) => {
        if (except && seat.player.id === except) return;
        if (pred(seat)) {
          send(seat.player.sock, yes);
        } else {
          send(seat.player.sock, no);
        }
      });
    },
    // a little bit of type hackery here, we need the seat reference
  } as Room;
  server.rooms[game].set(id, room);
  room.owner = joinRoom(player, room);
  player.room = room;
  return room;
}

function createPlayer(player: Player) {
  return {
    // ...DEFAULT_PLAYER,
    ...player,
  };
}

function isPlayer(anon: Anon): anon is Player {
  return 'id' in anon;
}

function send<T extends OutgoingMessageType>(
  ws: uWS.WebSocket,
  o: EmittedMessage<T>
) {
  const player: Anon | Player | undefined = players.get(ws) || anons.get(ws);
  if (!player) {
    throw Error("Tried to emit to a player who doesn't exist");
  }

  const out: OutgoingMessage = o;

  if (player.room && !stateExempt.includes(o.t)) {
    out.state = serializeRoom(player.room);
  }

  const payload = JSON.stringify(out);
  logger.debug(
    `Sending payload of length ${payload.length} to [${
      isPlayer(player) ? player.id : 'Anon'
    }]`
  );
  ws.send(payload);
}

function createSender(ws: uWS.WebSocket): Sender {
  return function <T extends OutgoingMessageType>(o: EmittedMessage<T>) {
    return send(ws, o);
  };
}

function spliceNewartist(artists: artist[]): artist {
  const random = Math.floor(Math.random() * artists.length);
  // we might have to get this to exclude stuff
  const reference = artists[random];
  artists.splice(random, 1);
  return reference;
}

function getRevealedAnswerPayload(
  ctx: CommandContext
): EmittedMessage<'answers_reveal'> {
  const answers = getRevealedAnswers(ctx);
  const artist = ctx.artists.get(String(ctx.room.correctAnswer.id));
  if (!artist) {
    const error = `The correct answer in room ${ctx.room.id} was an artist that's not in the artist registry`;
    logger.error(error);
    throw Error(error);
  }
  logger.info('Sending answer reveal');
  return {
    t: 'answers_reveal',
    answers,
    correct_answer: toRevealedartist(artist),
  };
}

function startRound(ctx: CommandContext) {
  // resetting the previous round's answers back to nothing
  for (const seat of ctx.room.seats.values()) {
    seat.answer = undefined;
    seat.answered = false;
  }
  const artist = spliceNewartist(ctx.room.artistPool);
  const { time } = difficulties.easy;
  ctx.room.roundStarted = true;
  ctx.room.correctAnswer = artist;
  ctx.room.broadcast({
    t: 'round_start',
    artist: {
      slug: artist._image!.slug,
    },
    // TODO: make this dependent on the state of the game
    secs: time,
  });
  ctx.room.endingTimeout = setTimeout(() => {
    endRound(ctx);
  }, time * 1000);
}

function endRound(ctx: CommandContext) {
  clearTimeout(ctx.room.endingTimeout);
  ctx.room.roundStarted = false;
  // TODO: choose winners of round
  ctx.room.round++;
  const payload = getRevealedAnswerPayload(ctx);
  ctx.room.broadcast(payload);
  if (ctx.room.round >= ctx.room.maxRounds) {
    return finishGame(ctx);
  }
  setTimeout(() => {
    startRound(ctx);
  }, DEFAULT_ROUND_WAIT_TIME * 1000);
}

function finishGame(ctx: CommandContext) {
  ctx.room.broadcast({
    t: 'game_end',
  });
}

function toRevealedartist(artist: artist): RevealedNuguChoice {
  return {
    artistId: artist.id,
    image: artist._image!.slug,
    group: artist.member_of[0].group.name,
    stageName: artist.stage_name!,
    fullName: artist.full_name,
  };
}

function getRevealedAnswers(ctx: CommandContext): RevealedAnswer[] {
  const userAnswers = Array.from(ctx.room.seats.values()).reduce(
    (all, seat) => {
      if (!seat.answer) {
        console.log(`${seat.player.username} has no answer`);
        return all;
      }

      const chosenartist = ctx.artists.get(String(seat.answer));
      if (!chosenartist) {
        throw new Error(
          "A user was able to pick an answer that doesn't exist in the artist pool"
        );
      }
      if (all[chosenartist.id]) {
        all[chosenartist.id].push(seat.player.id);
      } else {
        all[chosenartist.id] = [seat.player.id];
      }
      return all;
    },
    {} as { [artist_id: number]: string[] }
  );
  // TODO: optimize this? idk
  return Object.entries(userAnswers).map(([artistId, users]) => {
    const id = Number(artistId);
    const artist = ctx.artists.get(String(id));
    if (!artist) {
      throw Error('God ');
    }
    return {
      artist: toRevealedartist(artist),
      users: users
        .map((userId) => ctx.room.seats.get(userId)?.player)
        .filter((a) => a)
        .map((player) => serializePlayer(player as Player)),
    };
  });
}

function sendartists(player: Player, artistData: artist[]) {
  const artists = artistData.map(serializeartistChoice);
  send(player.sock, {
    t: 'artist_list',
    artists,
  });
}

function disconnectOwner(player: Player) {
  const { seat, room } = player;
  if (!room || !seat) {
    throw new ClientError("You're not in a room");
  }

  if (seat === room.owner) {
    room.broadcast(
      {
        t: 'force_disconnected',
        reason: 'Owner left the room',
      },
      player.id
    );
    room.seats.clear();
    server.rooms[room.type].delete(room.id);
    return;
  }

  room.seats.delete(player.id);
  room.broadcast({ t: 'disconnect', seat: serializeSeat(seat) }, player.id);
}

function commandCtx(ctx: Context): CommandContext {
  if (!ctx.player.room) {
    throw new ClientError('You must be in a room to do this');
  }
  if (!ctx.player.seat) {
    logger.error(
      `A player ${ctx.player.id} who is in a room is not in a seat? This should never happen`
    );
    throw new ClientError('You must be in a room to do this');
  }
  return {
    room: ctx.player.room,
    seat: ctx.player.seat,
    artists: ctx.artists,
  };
}

export const privateMessageHandlers: PrivateMessageHandlers = {
  create_room({ reply, player, allartists, args }) {
    // only nugu game for now
    if (args.game !== 'nugu') {
      return reply({ t: 'error', message: 'No such game mode' });
    }
    // TODO: turn this into something that can be adjusted later (not during creation)
    const room = createRoom(
      { player, artists: allartists, difficulty: 'easy' },
      args.game
    );
    reply({ t: 'created_room', room: serializeRoom(room) });
  },
  leave_room({ player }) {
    // We are assuming that the client doesn't
    // need confirmation to know that they left
    // the room
    return disconnectOwner(player);
  },
  join_room({ player, reply, args }) {
    const room = server.rooms.nugu.get(args.room);
    if (!room) {
      return reply({
        t: 'joined_room',
        error: `Room ${args.room} does not exist`,
      });
    }
    const playerAlreadyInRoom = room.seats.has(player.id);
    if (playerAlreadyInRoom) {
      return reply({ t: 'joined_room', error: "You're already in this room" });
    }

    if (room.started) {
      return reply({
        t: 'joined_room',
        error: 'This room has already started the game',
      });
    }

    const seat = joinRoom(player, room);
    reply({ t: 'joined_room', room: serializeRoom(room) });
    room.broadcast({ t: 'connect', seat: serializeSeat(seat) }, player.id);
  },
  start_game(data) {
    const { ...ctx } = data;
    const { player } = ctx;
    const { room, artists, seat } = commandCtx(data);

    if (!player.seat) {
      throw new Error(
        `User ${player.id} doesn't have a seat registered despite being in a room? This should never happen`
      );
    }

    if (room.started) {
      throw new ClientError('Game has already started');
    }

    if (room.owner !== player.seat) {
      throw new ClientError('Only owners of a room are allowed to start games');
    }

    room.broadcast({ t: 'starting', secs: DEFAULT_START_TIMEOUT });
    setTimeout(() => {
      startRound({ room, artists, seat });
    }, DEFAULT_START_TIMEOUT * 1000);
  },
  answer({ args, ...rest }) {
    const { player, reply } = rest;
    const ctx = commandCtx(rest);

    if (Number.isNaN(args.id)) {
      throw new ClientTechnicalError("Argument 'id' must be a valid number");
    }

    if (!ctx.room.roundStarted) {
      throw new ClientError('Round has not started yet');
    }

    ctx.seat.answer = args.id;
    ctx.seat.answered = true;

    if (args.id == ctx.room.correctAnswer.id) {
      ctx.seat.points++;
    }

    const hasEveryoneAnswered = [...ctx.room.seats.values()].every((seat) =>
      Boolean(seat.answer)
    );

    if (hasEveryoneAnswered) {
      return endRound(ctx);
    }

    reply(getRevealedAnswerPayload(ctx));
    // if the user sending packets has not answered yet they should
    // not see the other user's answer
    ctx.room.broadcastSplit({
      pred: (seat) => Boolean(seat.answer),
      yes: { t: 'user_answer', user_id: player.id, choice: args.id },
      no: { t: 'user_answer', user_id: player.id },
      except: player.id,
    });
  },
};

const publicMessageHandlers: PublicMessageHandlers = {
  async auth({ anon, reply, args, allartists }) {
    const ws = anon.sock;
    if (players.has(anon.sock)) {
      reply({ t: 'auth', success: false });
      throw new ClientTechnicalError('You are already authenticated');
    }
    const jwt = jsonwebtoken.verify(args.token, process.env.JWT_SECRET!);
    if (typeof jwt === 'string') {
      reply({ t: 'auth', success: false });
      throw new ClientTechnicalError('The token is a string...?');
    }
    anons.delete(ws);
    const id = (jwt as any).user_id as string;
    const { user } = await sdk.findUser({ id });
    if (!user) {
      return;
    }
    const { avatar, username } = user;
    const player = createPlayer({
      id,
      username,
      image: avatar?.slug,
      sock: ws,
      token: args.token,
    });
    players.set(ws, player);
    reply({ t: 'auth', success: true });
    sendartists(player, allartists);
    logger.info('Authed a user');
  },
};

function validateIncomingMessage(data: IncomingMessage) {
  const requiredArgs = Object.keys(Messages[data.t]);
  for (const arg of requiredArgs) {
    if (!(arg in data)) {
      throw new ClientTechnicalError(
        `${arg} is required for this event but was not supplied`
      );
    }
  }
}

const sdk = getSdk(client);
const port = 9002;

const publicEvents = new Set<keyof MessageHandlers>(['auth']);

function artistsPrimaryGroupLikes(i: artist) {
  return i.member_of[0].group.liked_by_aggregate.aggregate?.count ?? 0;
}

async function main() {
  setInterval(() => {
    logger.info(`STATS: ${server.rooms.nugu.size} NUGU rooms`);
  }, 1000 * 60 * 10);

  const artistData = (await sdk.artistsWithImages()).artists.filter(
    (artist) => artist.member_of.length > 0
  ) as artist[];

  artistData.sort(
    (a, b) => artistsPrimaryGroupLikes(b) - artistsPrimaryGroupLikes(a)
  );
  const keyedartistData = keyBy(artistData, (artist) => artist.id);
  const artists = new Map<string, artist>(Object.entries(keyedartistData));
  const artistChoices = artistData;
  const app = uWS.App();

  const publish = createPublishers(app);

  app
    .ws('/*', {
      compression: 0,
      maxPayloadLength: 16 * 1024 * 1024,
      idleTimeout: 100,
      maxBackpressure: 1024,
      open(ws) {
        anons.set(ws, {
          sock: ws,
        });
      },
      message: async (ws, message) => {
        const data: IncomingMessage = JSON.parse(
          Buffer.from(message).toString()
        );
        const { t, ...rest } = data;
        const player = players.get(ws);
        const anon = anons.get(ws);
        const reply = createSender(ws);
        const sharedContext = {
          // some weird stuff happening here it can't typecheck properly
          args: rest as any,
          ws,
          reply,
          artists,
          allartists: artistChoices,
        };
        if (t === 'p') {
          return reply({ t: 'p' });
        }
        if (publicEvents.has(t)) {
          const target = anon || player;
          if (!target) {
            throw Error(
              "A player who isn't registered anywhere attempted to make a request"
            );
          }
          return publicMessageHandlers.auth({
            ...sharedContext,
            anon: target,
          });
        }
        if (anon) {
          throw reply({
            t: 'error',
            message: 'You must be authorized to do that',
          });
        }
        if (!player) {
          return logger.error(
            'Got an event from a player who is not registered'
          );
        }
        const handler = privateMessageHandlers[t as PrivateIncomingMessageType];
        const context: Context = {
          ...sharedContext,
          player,
        };
        try {
          validateIncomingMessage(data);
          // @ts-ignore
          await handler(context);
        } catch (err) {
          if (err instanceof ClientError) {
            return void send(ws, { t: 'error', message: err.message });
          }
          if (err instanceof ClientTechnicalError) {
            return void send(ws, {
              t: 'technical_error',
              message: err.message,
            });
          }
          void send(ws, {
            t: 'error',
            message: 'Something went wrong... try again later',
          });
          logger.error(err);
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      drain: (ws) => {
        // TODO: ?
      },
      close: (ws) => {
        const player = players.get(ws);
        if (!player) {
          return logger.error(
            'A player was already removed before disconnecting'
          );
        }

        if (!player.room || !player.seat) {
          return;
        }

        const seat = serializeSeat(player.seat);
        leaveRoom(player, player.room);
        if (player.room.owner === player.seat) {
          disconnectOwner(player);
        }
        player.room.broadcast({ t: 'disconnect', seat });
        anons.delete(ws);
        players.delete(ws);
      },
    })
    .options('/*', (res) => {
      res.writeHeader('Access-Control-Allow-Origin', '*').end();
    })
    .any('/*', (res) => {
      res
        .writeStatus('302')
        .writeHeader('Location', 'https://dev.kiyomi.io/group/79/(G)I-DLE')
        .writeHeader('Access-Control-Allow-Origin', '*')
        .end();
    })
    .listen(port, (token) => {
      if (token) {
        console.log('Listening to port ' + port);
      } else {
        console.log('Failed to listen to port ' + port);
      }
    });
}

main();
