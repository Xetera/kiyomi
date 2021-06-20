import { useSelector } from "react-redux"
import { RootState } from "@/models/store"
import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/layout"
import { gameType, Hints } from "../../../shared/game"
import { z } from "zod"
import {
  Button,
  forwardRef,
  HStack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Spinner,
  VStack,
} from "@chakra-ui/react"
import { Input } from "@chakra-ui/input"
import { useSession } from "next-auth/client"
import GamePersonPicker from "@/components/game/game-person-picker"
import { GameServerContext } from "@/models/contexts"
import React, { ReactElement, ReactNode } from "react"
import Hr from "@/components/hr"
import isEqual from "react-fast-compare"
import { pick } from "lodash"
import { useState } from "@/hooks/useState"

interface HeadingLabelParams {
  name: string
  description: string
}

function HeadingLabel({ name, description }: HeadingLabelParams) {
  return (
    <Flex flexFlow="column">
      <Heading fontSize="lg" mb={2}>
        {name}
      </Heading>
      <Text color="gray.400" fontSize="sm">
        {description}
      </Text>
    </Flex>
  )
}

interface GameTypeParams {
  selected: boolean
  name: string
  description: string
  available: boolean
}

function GamePersonPickerSidebar() {
  const { selections, imagePoolSize } = useState((root) =>
    pick(root.game.room, ["selections", "imagePoolSize"])
  )
  const loadingImageCount = useState((root) => root.game.loadingImageCount)
  const selectedPeople = Object.values(selections ?? {}).flatMap(
    (s) => s.members
  ).length
  return (
    <>
      <HeadingLabel
        name="Game Pool"
        description="Select images that will be included."
      />
      <Text fontSize="sm" mt={2} color="blue.300">
        {selectedPeople} selected people
      </Text>
      <Text
        fontSize="sm"
        mt={2}
        color="blue.500"
        alignItems="center"
        display="flex"
      >
        {loadingImageCount === undefined ? (
          <Spinner size="xs" mr={2} />
        ) : (
          new Intl.NumberFormat("default").format(imagePoolSize ?? 0)
        )}{" "}
        possible image pool
      </Text>
    </>
  )
}

function GameType({ selected, name, description, available }: GameTypeParams) {
  return (
    <Flex
      borderWidth={selected ? "1px" : "0"}
      borderRadius="sm"
      background={available ? "inherit" : "bgSecondary"}
      borderColor="borderSubtle"
      p={4}
      flexFlow="column"
      cursor={available ? "pointer" : "not-allowed"}
    >
      <Heading as="h3" fontSize="sm" mb={1}>
        {name}
      </Heading>
      <Text fontSize="sm" color="gray.500">
        {description}
      </Text>
    </Flex>
  )
}

const gameTypes: Array<
  Omit<GameTypeParams, "selected"> & { type: z.infer<typeof gameType> }
> = [
  {
    type: "nugu",
    name: "Nugu Game",
    description: "Guess a person from an unknown face in an image.",
    available: true,
  },
  {
    type: "spotify",
    name: "Spotify Game",
    description: "Coming soon...",
    available: false,
  },
]

const RadioButton = forwardRef<
  { hints: Hints; title: ReactNode; description: ReactNode; value: Hints },
  "input"
>((props, ref) => {
  const { hints, title, description, value, ...rest } = props
  return (
    // @ts-ignore
    <Radio
      {...rest}
      onChange={props.onChange}
      isChecked={hints === value}
      ref={ref}
      value={value}
    >
      <Box cursor="pointer">
        <Heading fontSize="sm" mb={1}>
          {title}
        </Heading>
        <Text color="gray.400" fontSize="sm">
          {description}
        </Text>
      </Box>
    </Radio>
  )
})

const hintLevels: Array<{
  value: Hints
  title: string
  description: string
}> = [
  {
    value: "alwaysOn",
    title: "Always On",
    description:
      "Hints are automatically revealed to every player at the start of each round.",
  },
  {
    title: "Point Cost",
    value: "pointCost",
    description:
      "Players can use hints at the cost of half of their points for that turn.",
  },
  {
    value: "limited",
    title: "Limited",
    description:
      "Hints cost half a turn's points and can only be used maximum of 2 times a game.",
  },
  {
    value: "disabled",
    title: "Disabled",
    description: "Nobody can use hints.",
  },
]

export default function GameSetup() {
  const [session] = useSession()
  const room = useState((root) => {
    return pick(root.game.room, [
      "hints",
      "started",
      "owner",
      "selections",
      "secondsPerRound",
      "maxRoundCount",
      "imagePoolSize",
    ] as const) // root.game.room ?? {}
  })
  const { send } = React.useContext(GameServerContext)
  if (!room) {
    return null
  }
  const owner = room.owner
  const disabled = session?.user.id !== Number(owner?.id ?? "-1")

  function changeHints(hints: Hints) {
    send({ t: "pick_hints", hints })
  }

  function withNum(value: string, f: (num: number) => void) {
    const seconds = Number(value)
    if (Number.isNaN(seconds)) {
      return
    }
    f(seconds)
  }

  function changeTime(value: string) {
    withNum(value, (seconds) => {
      send({ t: "pick_time", seconds })
    })
  }
  const singleRow = ["1", null, null, "1 / 3"]

  function startGame() {
    send({ t: "start_game" })
  }

  function changeRoundCount(value: string) {
    withNum(value, (count) => {
      send({ t: "pick_round_count", count })
    })
  }

  return (
    <Flex width="100%" px={6} justifyContent="center">
      <Box maxWidth="1200px" my={[6, null, null, null, null, 24]} width="100%">
        <Flex
          flex={1}
          flexFlow="column"
          justifyContent="center"
          width="100%"
          mx="auto"
        >
          {disabled && (
            <Text mb={6} fontSize="sm" color="gray.400">
              You are waiting for <b>{room.owner?.username ?? "Someone?"}</b> to
              start the game
            </Text>
          )}
          <Grid
            gridTemplateColumns={["1fr", null, null, "200px auto"]}
            columnGap={8}
            rowGap={[8, null, null, 12]}
            width="100%"
          >
            <HeadingLabel
              name="Game Mode"
              description="Pick the game mode for the room"
            />
            <Grid gap={3} gridTemplateColumns="repeat(2, 1fr)">
              {gameTypes.map((game) => (
                <GameType
                  selected={game.type === room.type}
                  {...game}
                  key={game.type}
                />
              ))}
            </Grid>
            <Hr gridColumn={singleRow} />
            <HeadingLabel
              name="Round Count"
              description="Number of rounds that will be played."
            />
            <NumberInput
              height="min-content"
              borderColor="borderSubtle"
              onChange={changeRoundCount}
              value={room.maxRoundCount}
              defaultValue={room.maxRoundCount}
              maxWidth="300px"
              type="number"
              max={50}
              min={5}
              disabled={disabled}
            >
              <NumberInputField />
              {!disabled && (
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              )}
            </NumberInput>
            <HeadingLabel
              name="Round Time"
              description="Maximum seconds allowed for each player to make a guess."
            />
            <NumberInput
              height="min-content"
              borderColor="borderSubtle"
              onChange={changeTime}
              value={room.secondsPerRound}
              defaultValue={room.secondsPerRound}
              maxWidth="300px"
              type="number"
              max={60}
              min={5}
              disabled={disabled}
            >
              <NumberInputField />
              {!disabled && (
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              )}
            </NumberInput>
            <Flex flexFlow="column">
              <HeadingLabel
                name="Hints"
                description="Request more context to help answer the question."
              />
              <Hr my={3} />
              <Text mt={2} fontSize="sm" color="orange.300">
                In <b>Nugu Game</b>, hints let you see what the primary group of
                the idol you're guessing is.
              </Text>
            </Flex>
            <RadioGroup name="hints" value={room.hints}>
              <VStack spacing={6} alignItems="flex-start">
                {hintLevels.map((level) => (
                  <RadioButton
                    key={level.value}
                    disabled={disabled}
                    hints={room.hints ?? "pointCost"}
                    onChange={(a) => changeHints(level.value)}
                    value={level.value}
                    title={level.title}
                    description={level.description}
                  />
                ))}
              </VStack>
            </RadioGroup>
            <Flex flexFlow="column">
              <GamePersonPickerSidebar />
            </Flex>
            <GamePersonPicker disabled={disabled} />
            <Flex gridColumn={singleRow} justifyContent="flex-end">
              <Button size="sm" onClick={startGame} isDisabled={disabled}>
                {disabled ? "Waiting for owner" : "Start Game"}
              </Button>
            </Flex>
          </Grid>
        </Flex>
      </Box>
    </Flex>
  )
}
