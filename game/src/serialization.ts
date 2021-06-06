import * as _ from "lodash"
import { Player, Room, Seat, ClientPerson, ServerPerson } from "./messaging"
import { NuguChoice, PlayerS, RoomS, SeatS } from "~/shared/game"
import { Person } from "~/shared/backend"

export function serializePlayer(player: Player): PlayerS {
  const { username, id, ult, image } = player
  return { username, id, ult, image }
}

export function serializeSeat(seat: Seat): SeatS {
  return {
    answer: seat.answer,
    points: seat.points,
    answered: seat.answered,
    player: serializePlayer(seat.player),
  }
}

export function serializeRoom(room: Room): RoomS {
  return {
    id: room.id,
    owner: room.owner.player.id,
    groups: room.groupPool,
    secondsPerRound: room.difficulty.timePerRound,
    seats: _.keyBy(
      Array.from(room.seats.values(), serializeSeat),
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
