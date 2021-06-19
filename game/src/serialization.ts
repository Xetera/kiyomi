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
  console.time(`Room-${room.id}`)
  const selections = await fromPersonIds(room.personPool)
  console.timeEnd(`Room-${room.id}`)
  return {
    slug: room.id,
    type: room.type,
    name: room.name,
    owner: room.owner.player.id,
    hints: room.difficulty.hints,
    selections,
    secondsPerRound: room.difficulty.timePerRound,
    seats: keyBy(
      Array.from(room.seats.values(), (seat) => serializeSeat(seat, room)),
      (seat) => seat.player.id
    ),
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
