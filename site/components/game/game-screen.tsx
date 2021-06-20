import { Flex, Text } from "@chakra-ui/layout"
import { useState } from "@/hooks/useState"
import { forwardRef, Image } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useCountdown } from "@/hooks/game"
import pick from "lodash/pick"
import { Search } from "@/components/searchbar"
import React from "react"

const MotionFlex = motion(Flex)

function NextRoundCountdown({ seconds: _sec }: { seconds: number }) {
  const seconds = useCountdown(_sec)
  return (
    <Text fontSize="sm" color="yellow.400">
      Next round stars in {seconds}
    </Text>
  )
}

const GameSearch = forwardRef((props, ref) => {
  const [search, setSearch] = React.useState("")
  const [searching, setSearching] = React.useState(false)
  function a() {}
  return <Search search={search} setSearch={setSearch} searching={searching} />
})

export default function GameScreen() {
  const { waitingForNextRound } = useState((r) =>
    pick(r.game, ["waitingForNextRound"])
  )
  const round = useState((r) => r.game.round)
  const answers = useState((r) => r.game.answers)

  if (!round) {
    return null
  }
  return (
    <Flex
      flex={1}
      justifyContent="flex-start"
      alignItems="center"
      flexFlow="column"
    >
      <Flex
        minHeight="30px"
        width="100%"
        justifyContent="center"
        alignItems="center"
        position="fixed"
        top={0}
        background="bgPrimary"
        zIndex={2}
        borderBottomWidth="1px"
        borderColor="borderSubtle"
        fontSize="sm"
      >
        {answers && waitingForNextRound && (
          <NextRoundCountdown seconds={answers.nextRoundWait} />
        )}
      </Flex>
      <Flex
        flexFlow="column"
        height={["min-content", null, null, "600px"]}
        // flex={1}
        p={[3, null, 4, null, 6]}
        justifyContent="center"
        alignItems="center"
      >
        <Image src={round.imageUrl} borderRadius={["sm", null, null, "md"]} />
      </Flex>
      <Flex justifyContent="flex-start" height="2px" width="100%">
        <MotionFlex
          key={round.number}
          height="2px"
          justifyContent="flex-start"
          transition={{ duration: round.secs, type: "tween", ease: "linear" }}
          background="blue.100"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
        />
      </Flex>
      {/*{answers && answers.}*/}
    </Flex>
  )
}
