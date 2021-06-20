import { GameServerContext, GameServerContextData } from "@/models/contexts"
import useWebSocket from "react-use-websocket"
import React, { PropsWithChildren, useCallback, useMemo } from "react"
import { store } from "@/models/store"
import { OutgoingMessage } from "../../../shared/game"
import { useInterval } from "@chakra-ui/react"
import useToast from "@/hooks/useToast"

export type GameServerGatewayProps = {}

export default function GameServerGateway({
  children,
}: PropsWithChildren<GameServerGatewayProps>) {
  const info = useToast("info")
  const warning = useToast("warning")
  const { sendMessage } = useWebSocket(process.env.NEXT_PUBLIC_GAME_URL!, {
    onOpen() {
      info({
        description: "Connected to game servers",
      })
      store.dispatch.game.connectionChange(true)
    },
    async onMessage(m) {
      const incoming: OutgoingMessage = JSON.parse(m.data)
      await store.dispatch.game.message(incoming)
    },
    onClose(e) {
      console.log(`Disconnected from game server`, e)
      store.dispatch.game.connectionChange(false)
    },
    onReconnectStop(attempts) {
      warning({
        description: `Failed to reconnect to game servers after ${attempts} attempts. Try refreshing the page later.`,
      })
    },
    shouldReconnect(_e) {
      warning({
        description: `Connection lost to the game servers, attempting to reconnect...`,
      })
      return true
    },
    reconnectAttempts: 5,
  })

  React.useEffect(() => {
    store.dispatch.game.refreshSearchData()
  }, [])
  const data: GameServerContextData = useMemo(
    () => ({
      send(f) {
        console.log(`[Sending message]`, f)
        sendMessage(JSON.stringify(f))
      },
    }),
    []
  )
  const f = useCallback(() => data.send({ t: "p" }), [])
  // Server expects periodic pings
  useInterval(f, 60 * 1000)
  return (
    <GameServerContext.Provider value={data}>
      {children}
    </GameServerContext.Provider>
  )
}
