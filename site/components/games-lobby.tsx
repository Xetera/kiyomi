import { useSelector, useDispatch } from "react-redux"
import type { Dispatch, RootState } from "@/models/store"
import { Flex, Heading, Text } from "@chakra-ui/layout"
import { Navbar } from "@/components/navbar"
import Games from "@/pages/games"
import GameLobbyRow, { GameLobbyRowSkeleton } from "@/components/game-lobby-row"
import { Button, VStack } from "@chakra-ui/react"
import { GameServerContext } from "@/models/contexts"
import React from "react"
import { store } from "@/models/store"

export default function GamesLobby() {
  const { send } = React.useContext(GameServerContext)
  const rooms = useSelector((state: RootState) => state.game.rooms)
  const connected = useSelector((state: RootState) => state.game.connected)
  const waitedForInitialEvents = useSelector(
    (state: RootState) => state.game.waitedForInitialEvents
  )

  React.useEffect(() => {
    store.dispatch.game.clearRoom()
  }, [])

  function createRoom() {
    // hardcoded for now
    send({ t: "create_room", type: "nugu" })
  }

  return (
    <>
      <Navbar />
      <Flex width="100%" alignItems="center" justifyContent="center">
        <Flex flex={1} flexFlow="column" maxWidth="900px" mt={[6, 8, null, 12]}>
          <Flex mb={2} justifyContent="space-between" alignItems="center">
            <Heading fontSize={["md", null, "xl"]}>Game Rooms</Heading>
            <Button onClick={createRoom} size="sm">
              Create Room
            </Button>
          </Flex>
          <VStack spacing={4} flex="1">
            {!connected &&
              [...Array(4)].map((_, i) => <GameLobbyRowSkeleton key={i} />)}
            {connected && waitedForInitialEvents && rooms.length === 0 && (
              <Flex height="200px" alignItems="center" justifyContent="center">
                <Text fontSize="md" color="gray.300">
                  No rooms found, try creating one of your own
                </Text>
              </Flex>
            )}
            {rooms.map((room) => (
              <GameLobbyRow room={room} key={room.slug} />
            ))}
          </VStack>
        </Flex>
      </Flex>
    </>
  )
}
