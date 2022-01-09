import { useSelector } from "@/hooks/useSelector"
import pick from "lodash/pick"
import { useRaf, useTween } from "react-use"
import { Progress } from "@chakra-ui/react"
import React, { useCallback, useRef, useState } from "react"

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
  const animate = useCallback(() => {
    if (forceEnd) {
      setElapsed(1)
      return
    }
    const now = Date.now()
    const difference = endDate.getTime() - startDate.getTime()
    const elapsed = (now - startDate.getTime()) / difference
    setElapsed(Math.min(1, elapsed))
    raf.current = requestAnimationFrame(animate)
  }, [])
  React.useEffect(() => {
    console.log("mounting!")
    raf.current = requestAnimationFrame(animate)
    return () => {
      if (raf.current) {
        cancelAnimationFrame(raf.current)
      }
    }
  }, [])
  if (!round) {
    return null
  }

  return (
    <Progress value={elapsed} min={0} max={1} width="100%" key={round.number} />
  )
}

export const RoundCountdown = () => {
  const boundaries = useSelector((root) => root.game?.roundBoundaries)
  const waiting = useSelector((root) => root.game?.waitingForNextRound)
  if (!boundaries) {
    return null
  }
  const { startDate, endDate } = boundaries
  return (
    <GenericCountdown
      key={`${waiting}-${startDate.getTime()}-${endDate.getTime()}`}
      forceEnd={waiting}
      startDate={startDate}
      endDate={endDate}
    />
  )
}
