import * as _ from "lodash"
import {
  Player,
  Room,
  Seat,
  ClientPerson,
  ServerPerson,
  ClientGroup,
  ServerGroup,
} from "./messaging"
import { ClientPlayer, ClientRoom, ClientSeat } from "~/shared/game"

export function serializePlayer(player: Player): ClientPlayer {
  const { username, id, image } = player
  return { username, id, imageUrl: image }
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
    answered: seat.answered,
    points: room.history.filter((history) => {
      return history.answers.get(seat.player.id)?.id === history.correctId
    }).length,
    player: serializePlayer(seat.player),
  }
}

export function serializeRoom(room: Room): ClientRoom {
  return {
    id: room.id,
    owner: room.owner.player.id,
    groupPool: room.groupPool.map(serializeGroup),
    secondsPerRound: room.difficulty.timePerRound,
    seats: _.keyBy(
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
