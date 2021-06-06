import { createPubsub } from "./pubsub"
import { TemplatedApp } from "uWebSockets.js"

const pubsub = createPubsub()

export function createPublishers(app: TemplatedApp) {
  return {
    startGame: pubsub.listenFor("startGame", (data) => {
      app.publish("")
      console.log(data.game)
    }),
  }
}
