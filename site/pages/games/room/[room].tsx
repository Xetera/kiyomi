import {
  ContextSidebar,
  SidebarItem,
  WithSidebar,
} from "@/components/context-sidebar"
import { Navbar } from "@/components/navbar"
import { useSelector } from "react-redux"
import { RootState } from "@/models/store"
import { useRouter } from "next/router"
import React from "react"
import { GameServerContext } from "@/models/contexts"
import { Image } from "@chakra-ui/react"
import { Flex, Text } from "@chakra-ui/layout"
import GameSetup from "@/components/game-setup"

export default function GameRoom() {
  const { send } = React.useContext(GameServerContext)
  const router = useRouter()
  const room = useSelector((root: RootState) => root.game.room)
  React.useEffect(() => {
    // // we're already connected to a room
    if (room) {
      // console.warn("Already connected to a room, not attempting to join")
      return
    }
    console.log(router.query)
    if (!router.query.room) {
      console.warn("No room id found in router?")
      return
    }
    send({ t: "join_room", room: router.query.room as string })
  }, [router.query.room])
  return (
    <>
      <Navbar />
      <WithSidebar
        sidebar={
          <ContextSidebar
            items={[
              <SidebarItem title="Players" key="players">
                {Object.values(room?.seats ?? {}).map((seat) => (
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
        <GameSetup />
      </WithSidebar>
    </>
  )
}
