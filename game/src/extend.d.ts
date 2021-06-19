import * as uWS from "uWebSockets.js"
declare module "uWebSockets.js" {
  export interface WebSocket extends uWS.WebSocket {
    token?: string
    isClosed: boolean
  }
}
