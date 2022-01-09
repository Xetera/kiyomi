import { useSelector } from "@/hooks/useSelector"
import { Flex } from "@chakra-ui/react"
import { sidebarItemPadding } from "@/components/context-sidebar"

export const GameSidebar = () => {
  const round = useSelector((root) => root.game?.round)
  const started = useSelector((root) => root.game?.room?.started)
  const seats = useSelector((root) => root.game?.room?.seats)
  const roundNumber = round ? round.number + 1 : "?"

  if (!started) {
    return null
  }

  return (
    <Flex {...sidebarItemPadding} key={`${started}-${roundNumber}`}>
      <Flex>Round #{roundNumber}</Flex>
    </Flex>
  )
}
