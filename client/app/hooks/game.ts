import React from "react"
import { store } from "@/models/store"
import { GameServerContext } from "@/models/contexts"
import { useInterval } from "@chakra-ui/react"

export function useLeaveRoomOnUnMount() {
  const { send } = React.useContext(GameServerContext)
  React.useEffect(() => {
    return () => {
      send({ t: "leave_room" })
      store.dispatch.game.clearRoom()
    }
  }, [])
}

export function useCountdown(_sec: number) {
  const [seconds, setSeconds] = React.useState(_sec)
  const update = React.useCallback(() => setSeconds((prev) => prev - 1), [
    setSeconds,
  ])
  useInterval(update, 1000)
  return seconds
}
