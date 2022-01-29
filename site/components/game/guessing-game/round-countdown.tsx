import { useSelector } from "@/hooks/useSelector"
import { Progress } from "@chakra-ui/react"
import React, { useCallback, useRef, useState } from "react"
import { ClientRoom, ClientRound } from "../../../../shared/game"

// const useRaf = ()

export type RoundCountdownProps = {
  forceEnd?: boolean
  startDate: Date
  endDate: Date
}

export const GenericCountdown = ({
  forceEnd,
  endDate,
  startDate,
}: RoundCountdownProps) => {
  const round = useSelector((r) => r.game.round)
  const [elapsed, setElapsed] = useState(0)
  const raf = useRef<number>()
  const cancelRafIfExists = () => {
    if (raf.current) {
      cancelAnimationFrame(raf.current)
    }
  }

  const animate = useCallback(() => {
    if (forceEnd) {
      setElapsed(1)
      cancelRafIfExists()
      return
    }
    const now = Date.now()
    const difference = endDate.getTime() - startDate.getTime()
    const elapsed = (now - startDate.getTime()) / difference
    setElapsed(Math.min(1, elapsed))
    raf.current = requestAnimationFrame(animate)
  }, [forceEnd])
  React.useEffect(() => {
    raf.current = requestAnimationFrame(animate)
    return cancelRafIfExists
  }, [])
  if (!round) {
    return null
  }

  return (
    <Progress value={elapsed} min={0} max={1} width="100%" key={round.number} />
  )
}

function shouldRoundCountdown(round: ClientRound) {
  const states = ["waitingForNextRound", "loadingImages"]
  return states.includes(round.state.type)
}

export const RoundCountdown = () => {
  const boundaries = useSelector((root) => root.game?.roundBoundaries)
  const round = useSelector((root) => root.game?.round)
  if (!boundaries) {
    return null
  }
  const shouldCountdown = round ? shouldRoundCountdown(round) : false
  const { startDate, endDate } = boundaries
  return (
    <GenericCountdown
      key={`${shouldCountdown}-${startDate.getTime()}-${endDate.getTime()}`}
      forceEnd={!shouldCountdown}
      startDate={startDate}
      endDate={endDate}
    />
  )
}
