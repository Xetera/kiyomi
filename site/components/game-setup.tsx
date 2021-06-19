import { useSelector } from "react-redux"
import { RootState } from "@/models/store"
import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/layout"
import { gameType, Hints } from "../../shared/game"
import { z } from "zod"
import {
  forwardRef,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  VStack,
} from "@chakra-ui/react"
import { Input } from "@chakra-ui/input"
import { useSession } from "next-auth/client"
import GamePersonPicker from "@/components/game-person-picker"
import { GameServerContext } from "@/models/contexts"
import React, { ReactElement, ReactNode } from "react"
import Hr from "@/components/hr"

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
>((props, ref) => (
  <Radio
    alignItems="flexStart"
    isChecked={props.hints === props.value}
    {...props}
    ref={ref}
    value={props.value}
  >
    <Heading fontSize="sm" mb={1}>
      {props.title}
    </Heading>
    <Text color="gray.300" fontSize="sm">
      {props.description}
    </Text>
  </Radio>
))

export default function GameSetup() {
  const [session] = useSession()
  const room = useSelector((root: RootState) => root.game.room)
  const { send } = React.useContext(GameServerContext)
  if (!room) {
    return null
  }
  const ownerSeat = Object.values(room.seats).find((seat) => seat.owner)
  const owner = ownerSeat?.player
  const selectedPeople = Object.values(room.selections).flatMap(
    (s) => s.members
  ).length
  const disabled = session?.user.id !== Number(owner?.id ?? "-1")
  console.log({ disabled })
  function changeTime(value: string) {
    const seconds = Number(value)
    if (Number.isNaN(seconds)) {
      return
    }
    send({ t: "pick_time", seconds })
  }

  return (
    <Flex width="100%" px={6} justifyContent="center">
      <Box maxWidth="1200px" mt={12} width="100%">
        <Flex flex={1} justifyContent="center" width="100%" mx="auto">
          <Grid
            gridTemplateColumns={["1fr", null, null, "200px auto"]}
            columnGap={6}
            rowGap={12}
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
            <HeadingLabel
              name="Round Time"
              description="Maximum time allowed for each player to make a guess."
            />
            <NumberInput
              height="min-content"
              borderColor="borderSubtle"
              onChange={(data) => changeTime(data)}
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
              <Text mt={2} fontSize="sm" color="orange.200">
                In <b>Nugu Game</b>, hints let you see what the primary group of
                the idol you're guessing is.
              </Text>
            </Flex>
            <RadioGroup name="hints">
              <VStack spacing={6} alignItems="flex-start">
                <RadioButton
                  hints={room.hints}
                  value="alwaysOn"
                  title="Always On"
                  description="Hints are always shown to everyone at no cost."
                />
                <RadioButton
                  hints={room.hints}
                  value="pointCost"
                  title="Point Cost"
                  description="Allow players to use any amount of hints at the cost of half of their points for that turn."
                />
                <RadioButton
                  hints={room.hints}
                  value="limited"
                  title="Limited"
                  description="Hints cost half a turn's points and can only be used maximum of 2 times a game."
                />
                <RadioButton
                  hints={room.hints}
                  value="disabled"
                  title="Disabled"
                  description="Nobody can use hints."
                />
              </VStack>
            </RadioGroup>
            <Flex flexFlow="column">
              <HeadingLabel
                name="Game Pool"
                description="Select images that will be included."
              />
              <Text fontSize="sm" mt={2} color="blue.300">
                {selectedPeople} selected people
              </Text>
            </Flex>
            <GamePersonPicker disabled={disabled} />
          </Grid>
        </Flex>
      </Box>
    </Flex>
  )
}
