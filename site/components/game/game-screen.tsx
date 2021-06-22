import { Flex, Grid, Heading, Text } from "@chakra-ui/layout"
import { useState } from "@/hooks/useState"
import { forwardRef, Image, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useCountdown } from "@/hooks/game"
import pick from "lodash/pick"
import { Search } from "@/components/searchbar"
import React, { SyntheticEvent } from "react"
import { store } from "@/models/store"
import { GameServerContext } from "@/models/contexts"

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
  const { send } = React.useContext(GameServerContext)
  const searching = useState((r) => r.game.personHintSearching)

  const [search, setSearch] = React.useState("")
  function onEnter() {
    send({ t: "answer", id: store.getState().game.personHintResults[0].id })
  }
  function onSearch(q: string) {
    store.dispatch.game.searchIdol(q)
  }
  return (
    <Search
      search={search}
      setSearchString={setSearch}
      searching={searching}
      onSearch={onSearch}
      onEnter={onEnter}
      debounceTime={150}
      placeholder="Who's the highlighted person?"
      hasClearButton={false}
      {...props}
      ref={ref}
    />
  )
})

const SearchResults = forwardRef((props, ref) => {
  const { send } = React.useContext(GameServerContext)
  const results = useState((r) => r.game.personHintResults)
  function submit(event: KeyboardEvent<HTMLDivElement>, id: number) {
    if (event.key !== "Enter") {
      return
    }
    send({ t: "answer", id })
  }
  return (
    <Grid
      {...props}
      ref={ref}
      alignItems="flex-start"
      gap={4}
      gridAutoFlow="row"
    >
      {results.map((result) => (
        <Flex
          key={result.id}
          alignItems="center"
          tabindex={0}
          onKeyDown={(e) => submit(e, result.id)}
        >
          <Image
            src="https://placewaifu.com/image/30/30"
            width="35px"
            height="35px"
            borderRadius="md"
            mr={2}
          />
          <Flex flexFlow="column">
            <Heading fontSize="md">{result.name}</Heading>
            <Flex flexFlow="row wrap" as="span" lineHeight="1.4">
              {result.aliases.map((e) => (
                <Text fontSize="md" color="gray.500" mr={2}>
                  {e}
                </Text>
              ))}
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Grid>
  )
})

export default function GameScreen() {
  const { waitingForNextRound, round, answers } = useState((r) =>
    pick(r.game, ["waitingForNextRound", "round", "answers"])
  )

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
        flexFlow="column"
        height={["min-content", null, null, "auto"]}
        minHeight={["300px", null, "500px", "550px"]}
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
      <Flex
        minHeight="30px"
        width="100%"
        justifyContent="center"
        alignItems="center"
        position="static"
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
        height="100%"
        width="100%"
        justifyContent="center"
        p={6}
        maxWidth="600px"
      >
        <Flex position="relative" height="min-content" flex={1}>
          <GameSearch mb={4} flex={1} />
          <SearchResults position="absolute" top="100%" />
        </Flex>
      </Flex>
    </Flex>
  )
}
