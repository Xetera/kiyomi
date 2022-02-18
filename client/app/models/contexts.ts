import { OneImageQuery } from "~/__generated__/graphql"
import React from "react"
import { WebSocketHook } from "react-use-websocket/dist/lib/types"
import { IncomingMessage } from "../../../shared/game"
import { GraphQLClient } from "graphql-request"

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
  send(f) {
    console.warn(
      "A send event was emitted to the socket without initializing the connection"
    )
    // this.socket.sned
  },
})

export const GraphqlClientContext = React.createContext<GraphQLClient>(
  undefined!
)
