import { OneImageQuery } from "@/__generated__/graphql"
import React from "react"
import { WebSocketHook } from "react-use-websocket/dist/lib/types"
import {
  IncomingMessage,
  IncomingMessageData,
  IncomingMessageType,
} from "../../shared/game"

export const FaceContext = React.createContext({
  setFace: (() => {}) as React.Dispatch<React.SetStateAction<string>>,
  face: "",
})

export const ImageContext = React.createContext<OneImageQuery["image"] | null>(
  null
)

export type GameServerContextData = {
  socket?: WebSocketHook<MessageEvent<any>>
  send(f: IncomingMessage): void
}

export const GameServerContext = React.createContext<GameServerContextData>({
  socket: undefined,
  send(f) {
    if (!this.socket) {
      console.warn(
        "A send event was emitted to the socket without initializing the connection"
      )
      return
    }
    // this.socket.sned
  },
})
