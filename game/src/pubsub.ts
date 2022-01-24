import { Opaque } from "./extend"

export type Topic = Opaque<"Topic", string>

export const topics = {
  /**
   * All users ready to receive unrevealed answers.
   * Meaning users who have answered the question
   * @param room
   */
  answers: (room: string) => `room/${room}/answers` as Topic,
  /**
   * Changes to rooms
   */
  rooms: () => `rooms` as Topic,
  /**
   * Changes to a specific room
   */
  room: (roomId: string) => `room/${roomId}` as Topic,
  roomSubEvents: (roomId: string) => `room/${roomId}/#` as Topic,
  /**
   * Prepare loading the image before answering
   */
  prepareImages: (roomId: string) => `room/${roomId}/imageLoad`,
}
