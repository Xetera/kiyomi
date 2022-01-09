import {
  ContextSidebar,
  SidebarItem,
  WithSidebar,
} from "@/components/context-sidebar"
import { Navbar, WithNavbar } from "@/components/navbar"
import { useRouter } from "next/router"
import React from "react"
import { GameServerContext } from "@/models/contexts"
import { Image } from "@chakra-ui/react"
import { Flex, Text } from "@chakra-ui/layout"
import GameSetup from "@/components/game/game-setup"
import GameCountdown from "@/components/game/game-countdown"
import { useLeaveRoomOnUnMount } from "@/hooks/game"
import GameScreen from "@/components/game/game-screen"
import { useSelector } from "@/hooks/useSelector"
import { GameSidebar } from "@/components/game/guessing-game/game-sidebar"

export default function GameRoom() {
  const { send } = React.useContext(GameServerContext)
  const router = useRouter()
  const seats = useSelector((root) => root.game.room?.seats)
  const started = useSelector((root) => root.game.room?.started)
  const starting = useSelector((root) => root.game.countingDown)
  useLeaveRoomOnUnMount()
  React.useEffect(() => {
    // // we're already connected to a room
    if (!router.query.room) {
      console.warn("No room id found in router?")
      return
    }
    send({ t: "join_room", room: router.query.room as string })
  }, [router.query.room])
  return (
    <WithNavbar>
      <WithSidebar
        sidebar={
          <ContextSidebar
            items={[
              <GameSidebar />,
              <SidebarItem title="Players" key="players">
                {seats?.map((seat) => (
                  <Flex
                    alignItems="center"
                    px={[3, 4, 5]}
                    py={[2, 3, 4]}
                    key={seat.player.id}
                  >
                    <Image
                      src={seat.player.imageUrl}
                      width="35px"
                      height="35px"
                      borderRadius="999px"
                      mr={3}
                    />
                    <Flex flexFlow="column">
                      <Text fontSize="sm" fontWeight="bold">
                        {seat.player.username}
                      </Text>
                      <Text color="gray.400" fontWeight="normal" fontSize="sm">
                        {seat.owner ? "👑 Owner" : "Player"}
                      </Text>
                    </Flex>
                  </Flex>
                ))}
              </SidebarItem>,
            ]}
          />
        }
      >
        {!started && <GameSetup />}
        {starting && !started && <GameCountdown seconds={4} />}
        {started && <GameScreen />}
      </WithSidebar>
    </WithNavbar>
  )
}
