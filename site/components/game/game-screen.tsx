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
import { GameBody } from "@/components/game/guessing-game/game-body"

const MotionFlex = motion(Flex)

function NextRoundCountdown({ seconds: _sec }: { seconds: number }) {
  const seconds = useCountdown(_sec)
  return (
    <Text fontSize="sm" color="yellow.400">
      Next round stars in {seconds}
    </Text>
  )
}

export default function GameScreen() {
  const { round, answers } = useSelector((r) =>
    pick(r.game, ["round", "answers"])
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
        {answers && round.state.type === "waitingForNextRound" && (
          <NextRoundCountdown seconds={round.state.waitSeconds} />
        )}
      </Flex>
      <Flex
        height="100%"
        width="100%"
        justifyContent="center"
        p={6}
        maxWidth="600px"
      >
        <GameBody />
      </Flex>
    </Flex>
  )
}
