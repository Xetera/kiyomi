import {
  GuessingPrompt,
  Player,
  Room,
  Rooms,
  Seat,
  ServerPerson,
} from "./messaging"
import {
  ClientImage,
  ClientPerson,
  ClientPlayer,
  ClientRoom,
  ClientRoomPreview,
  ClientSeat,
} from "../../shared/game"
import { fromPersonIds } from "./query"
import { DEFAULT_START_TIMEOUT } from "./config"

export function serializePlayer(player: Player): ClientPlayer {
  const { username, id, image } = player
  return { username, id, imageUrl: image }
}

export function serializeRoomPreview(
  room: Room,
  gameType: keyof Rooms
): ClientRoomPreview {
  return {
    slug: room.id,
    name: room.name,
    started: room.started,
    maxPlayers: room.maxSeats,
    players: Array.from(room.seats.values(), (seat) =>
      serializePlayer(seat.player)
    ),
    selectedPeople: room.personPool.length,
    type: gameType,
  }
}

export function serializeSeat(seat: Seat, room: Room): ClientSeat {
  return {
    state: seat.state,
    owner: seat.owner,
    answered: seat.answered,
    points: seat.score,
    player: serializePlayer(seat.player),
  }
}

export const promptImageUrl = ({ image }: GuessingPrompt) =>
  image.thumbnail.large

export function serializeImage(prompt: GuessingPrompt): ClientImage {
  const { image, face } = prompt
  return {
    type: "fullImage",
    url: promptImageUrl(prompt),
    width: image.width,
    height: image.height,
    // could have more images later on
    faces: [face],
  }
}

export async function serializeRoom(room: Room): Promise<ClientRoom> {
  console.time(`room-serialization-${room.id}`)
  const selections = await fromPersonIds(room.personPool)
  console.timeEnd(`room-serialization-${room.id}`)
  return {
    state: room.state,
    slug: room.id,
    type: room.type,
    started: room.started,
    name: room.name,
    countdownLength: DEFAULT_START_TIMEOUT,
    coordination: room.coordination,
    owner: room.owner ? serializePlayer(room.owner.player) : undefined,
    hints: room.difficulty.hints,
    imagePoolSize: room.imagePool.length,
    maxRoundCount: room.maxRounds,
    selections,
    secondsPerRound: room.difficulty.timePerRound,
    seats: Array.from(room.seats.values(), (seat) => serializeSeat(seat, room)),
  }
}

export function serializePerson(person: ServerPerson): ClientPerson {
  const [firstMembership] = person.memberOf
  return {
    id: person.id,
    group: person.preferredMembership?.group?.id,
    image: person.avatar?.thumbnail.large,
    name: person.name,
    aliases: person.aliases.map((alias) => alias.name),
    preferredGroupName: (person.preferredMembership ?? firstMembership)?.group
      .name,
    preferredAlias: person.preferredAlias?.name,
  }
}

export function serializeRound(room: Room, image: ClientImage) {
  return {
    state: room.state,
    number: room.round,
    image,
    scores: Object.fromEntries(
      Array.from(room.seats.values(), (seat) => [seat.player.id, seat.score])
    ),
  }
}
