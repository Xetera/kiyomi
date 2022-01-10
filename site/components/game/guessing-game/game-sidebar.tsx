import { useSelector } from "@/hooks/useSelector"
import { Flex, Text } from "@chakra-ui/react"
import { sidebarItemPadding } from "@/components/context-sidebar"
import { Stack } from "@chakra-ui/layout"
import React from "react"
import { GamePortrait } from "@/components/game/game-portrait"

export const GameSidebar = () => {
  const round = useSelector((root) => root.game?.round)
  const started = useSelector((root) => root.game?.room?.started)
  const seats = useSelector((root) => root.game?.room?.seats)
  const roundNumber = round ? round.number + 1 : "?"

  if (!started) {
    return null
  }

  const sortedPlayers = [...(seats ?? [])].sort((a, b) => b.points - a.points)

  return (
    <Stack
      height="100%"
      spacing={[2, 2, 2]}
      direction="column"
      key={`${started}-${roundNumber}`}
    >
      <Flex {...sidebarItemPadding}>
        <Flex>Round #{roundNumber}</Flex>
      </Flex>
      <Flex {...sidebarItemPadding} flexFlow="column">
        {sortedPlayers.map((seat) => (
          <GamePortrait
            name={seat.player.username}
            avatar={seat.player.imageUrl}
          >
            <Text fontSize="sm" color="gray.400">
              {seat.points} Points
            </Text>
          </GamePortrait>
        ))}
      </Flex>
    </Stack>
  )
}
