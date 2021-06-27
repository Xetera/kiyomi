import {
  Player,
  Room,
  Seat,
  ServerPerson,
  ClientGroup,
  ServerGroup,
  Rooms,
} from "./messaging"
import {
  ClientPlayer,
  ClientRoom,
  ClientSeat,
  ClientPerson,
  ClientRoomPreview,
} from "../../shared/game"
import { keyBy } from "lodash"
import { fromPersonIds } from "./query"
import { DEFAULT_START_TIMEOUT } from "./index"

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

export function serializeGroup(group: ServerGroup): ClientGroup {
  return {
    aliases: group.aliases.map((alias) => alias.name),
    id: group.id,
    name: group.name,
  }
}

export function serializeSeat(seat: Seat, room: Room): ClientSeat {
  return {
    answer: seat.answer,
    owner: seat.owner,
    answered: seat.answered,
    points: room.history.filter((history) => {
      return history.answers.get(seat.player.id)?.answer === history.correctId
    }).length,
    player: serializePlayer(seat.player),
  }
}

export async function serializeRoom(room: Room): Promise<ClientRoom> {
  console.time(`room-serialization-${room.id}`)
  const selections = await fromPersonIds(room.personPool)
  console.timeEnd(`room-serialization-${room.id}`)
  return {
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
  return {
    id: person.id,
    group: person.preferredMembership?.group?.id,
    name: person.name,
    aliases: person.aliases.map((alias) => alias.name),
  }
}
