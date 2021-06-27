import * as uWS from "uWebSockets.js"
import { Player } from "./messaging"

type Opaque<K, T> = T & { __TYPE__: K }

declare module "uWebSockets.js" {
  export interface WebSocket extends uWS.WebSocket {
    token?: string
    isClosed: boolean
    player?: Player
  }
}
