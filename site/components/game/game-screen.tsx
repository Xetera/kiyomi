import { Flex, Grid, Heading, Text } from "@chakra-ui/layout"
import { useSelector } from "@/hooks/useSelector"
import { Button, forwardRef, Image, Kbd, Progress } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useCountdown } from "@/hooks/game"
import pick from "lodash/pick"
import { Search } from "@/components/searchbar"
import React from "react"
import { store } from "@/models/store"
import { GameServerContext } from "@/models/contexts"
import { useTween } from "react-use"
import { Face, ImageWithFaces } from "../image-display"
import { useDispatch } from "react-redux"
import { RoundCountdown } from "@/components/game/guessing-game/round-countdown"

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
  const searching = useSelector((r) => r.game.personHintSearching)
  const hints = useSelector((r) => r.game.room?.hints)

  const [search, setSearch] = React.useState("")
  function onEnter() {
    // we don't need reactivity so this is a faster way of doing things
    const [firstPerson] = store.getState().game.personHintResults
    if (!firstPerson) {
      console.warn("No person hints to choose from")
      return
    }
    send({ t: "answer", id: Number(firstPerson.document.id) })
  }
  function onSearch(q: string) {
    store.dispatch.game.searchIdol(q)
  }
  return (
    <Flex
      {...props}
      ref={ref}
      zIndex="4"
      flexFlow="column"
      position={["fixed", null, "static"]}
      left={0}
      right={0}
      bottom={0}
    >
      <Search
        search={search}
        setSearchString={setSearch}
        searching={searching}
        onSearch={onSearch}
        onEnter={onEnter}
        debounceTime={150}
        placeholder="Who's the highlighted person?"
        mb={[0, null, null, 3]}
        hasClearButton={false}
      />
      <Text color="gray.500" fontSize="xs">
        {hints !== "disabled" && (
          <>
            <Kbd>Ctrl</Kbd> + <Kbd>Space</Kbd> to request a hint
          </>
        )}
      </Text>
      <SearchResults
        setSearch={setSearch}
        zIndex="4"
        position="absolute"
        top={{ base: "unset", lg: "100%" }}
        bottom={{ base: "100%", lg: "unset" }}
        gridAutoFlow="row-reverse"
      />
    </Flex>
  )
})

const SearchResults = forwardRef((props, ref) => {
  const { send } = React.useContext(GameServerContext)
  const results = useSelector((r) => r.game.personHintResults)
  function submit(id: number) {
    props.setSearch("")
    send({ t: "answer", id })
  }
  return (
    <Grid
      {...props}
      ref={ref}
      w="full"
      alignItems="flex-start"
      gap={4}
      gridAutoFlow="row"
    >
      {results.map(({ document: result }) => (
        <Button
          key={result.id}
          bg="transparent"
          borderColor="borderSubtle"
          borderWidth="1px"
          px={4}
          py={2}
          w="full"
          h="full"
          appearance="none"
          alignItems="center"
          justifyContent="flex-start"
          tabindex={0}
          onClick={() => submit(Number(result.id))}
        >
          <Image
            src="https://placewaifu.com/image/30/30"
            width="35px"
            height="35px"
            borderRadius="md"
            mr={2}
          />
          <Flex flexFlow="column" alignItems="flex-start">
            <Heading fontSize="md">{result.name}</Heading>
            <Flex flexFlow="row wrap" as="span" lineHeight="1.4">
              {result.aliases.map((e) => (
                <Text fontSize="sm" color="gray.500" mr={2}>
                  {e}
                </Text>
              ))}
            </Flex>
          </Flex>
        </Button>
      ))}
    </Grid>
  )
})

export default function GameScreen() {
  const { waitingForNextRound, round, answers } = useSelector((r) =>
    pick(r.game, ["waitingForNextRound", "round", "answers"])
  )

  if (!round) {
    return null
  }
  const { image } = round
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
        p={[3, null, 4, null, 6]}
        justifyContent="center"
        alignItems="center"
      >
        <ImageWithFaces
          image={image}
          faces={(imageSize) => (
            <>
              {image.faces.map((face) => (
                <Face
                  key={`${face.x}-${face.y}-${face.width}-${face.height}`}
                  label="Who is this?"
                  forceActive
                  face={face}
                  style={{
                    left: (face.x * imageSize.width) / (image?.width ?? 1),
                    top: (face.y * imageSize.height) / (image?.height ?? 1),
                    width: (face.width * imageSize.width) / (image?.width ?? 1),
                    height:
                      (face.height * imageSize.height) / (image?.height ?? 1),
                  }}
                />
              ))}
            </>
          )}
        />
      </Flex>
      <Flex justifyContent="flex-start" height="2px" width="100%">
        <RoundCountdown />
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
        </Flex>
      </Flex>
    </Flex>
  )
}
