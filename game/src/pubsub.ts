import { Opaque } from "./extend"

export type Topic = Opaque<"Topic", string>

export const topics = {
  answers: (room: string) => `room/${room}/answers` as Topic,
  rooms: () => `rooms` as Topic,
  room: (roomId: string) => `room/${roomId}` as Topic,
}
