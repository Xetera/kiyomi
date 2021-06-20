import * as uWS from "uWebSockets.js"
import { Player } from "./messaging"
declare module "uWebSockets.js" {
  export interface WebSocket extends uWS.WebSocket {
    token?: string
    isClosed: boolean
    player?: Player
  }
}
