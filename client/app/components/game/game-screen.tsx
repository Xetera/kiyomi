import { Flex, Grid, Text } from "@chakra-ui/layout"
import { Box, Image, Link, VStack } from "@chakra-ui/react"
import { useSelector } from "~/hooks/useSelector"
import { motion } from "framer-motion"
import { useCountdown } from "~/hooks/game"
import pick from "lodash/pick"
import React, { useContext } from "react"
import { Face, ImageWithFaces } from "../image-display"
import { RoundCountdown } from "~/components/game/guessing-game/round-countdown"
import { GameBody } from "~/components/game/guessing-game/game-body"
import { InteractableButton } from "~/components/image/image-sidebar"
import { RiAlarmWarningLine, RiHeartFill, RiImage2Line } from "react-icons/ri"
import { Routing } from "~/client/routing"
import { GameServerContext } from "@/models/contexts"
import { useSet } from "react-use"
import { ClientSeat } from "../../../shared/game"

const MotionBox = motion(Box)

function NextRoundCountdown({ seconds: _sec }: { seconds: number }) {
  const seconds = useCountdown(_sec)
  return (
    <Text fontSize="sm" color="yellow.400">
      Next round stars in {seconds}
    </Text>
  )
}

export default function GameScreen() {
  const { send } = useContext(GameServerContext)
  const { round, answers } = useSelector((r) =>
    pick(r.game, ["round", "answers"])
  )
  const [sent, { add }] = useSet()

  function onImageLoad() {
    if (!round) {
      return
    }
    if (sent.has(round.number)) {
      return
    }
    add(round.number)
    send({ t: "image_load" })
  }

  const roundImage =
    round?.state.type === "loadingImages"
      ? { url: round.state.imageUrl }
      : round?.image

  const size =
    round && round.state.type === "waitingForNextRound" ? "40vh" : "75vh"
  return (
    <Grid
      flex={1}
      maxW="1500px"
      mx="auto"
      h="full"
      gridTemplateAreas={["'game' 'sidebar'", null, null, "'sidebar game'"]}
      gridTemplateColumns={["1fr", null, null, "2fr 3fr", "2fr 4fr"]}
      justifyContent="flex-start"
      alignItems="center"
      flexFlow="row"
    >
      <Flex
        borderLeftWidth="1px"
        borderRightWidth="1px"
        borderColor="borderSubtle"
        height="100%"
        width="100%"
        gridArea="sidebar"
        justifyContent="center"
      >
        <GameBody />
      </Flex>
      <VStack w="full" alignSelf="flex-start">
        <Flex
          w="full"
          flexFlow="column"
          height="100%"
          borderRightWidth="1px"
          borderColor="borderSubtle"
          gridArea="game"
          // p={[3, null, 4, null, 6]}
          justifyContent="flex-start"
          alignItems="center"
        >
          <MotionBox
            animate={{ height: size }}
            transition={{ type: "tween", duration: 0.4 }}
            w="full"
          >
            {roundImage && (
              <ImageWithFaces
                size={size}
                key={roundImage.url}
                blurred={round?.state.type === "loadingImages"}
                onLoad={onImageLoad}
                image={roundImage}
                faces={(imageSize) => (
                  <>
                    {round?.image.type === "fullImage" &&
                      round.image.faces.map((face) => {
                        if (round.image.type !== "fullImage") {
                          // idk why I have to do this lol
                          return null
                        }
                        return (
                          <Face
                            noBackground
                            key={`${face.x}-${face.y}-${face.width}-${face.height}`}
                            label={
                              round &&
                              round.state.type === "waitingForNextRound"
                                ? round.state.correctAnswer.name
                                : "Who is this?"
                            }
                            forceActive
                            face={face}
                            style={{
                              left:
                                (face.x * imageSize.width) /
                                (round.image.width ?? 1),
                              top:
                                (face.y * imageSize.height) /
                                (round.image.height ?? 1),
                              width:
                                (face.width * imageSize.width) /
                                (round.image.width ?? 1),
                              height:
                                (face.height * imageSize.height) /
                                (round.image.height ?? 1),
                            }}
                          />
                        )
                      })}
                  </>
                )}
              />
            )}
          </MotionBox>
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
            {answers && round?.state.type === "waitingForNextRound" && (
              <NextRoundCountdown seconds={round.state.waitSeconds} />
            )}
          </Flex>
          <Flex
            pt={3}
            pb={1}
            direction="row"
            spacing={0}
            borderBottomWidth="1px"
            borderColor="borderSubtle"
            w="full"
            justify="center"
            flexFlow="row wrap"
          >
            <InteractableButton
              icon={<RiHeartFill />}
              text="Like"
              onClick={() => {}}
            />
            {round && (
              <Link
                href={Routing.toImage(
                  round.state.type === "waitingForNextRound"
                    ? round.state.imageSlug
                    : "#"
                )}
                textDecoration="none !important"
                target="_blank"
              >
                <InteractableButton
                  icon={<RiImage2Line />}
                  disabled={round.state.type !== "waitingForNextRound"}
                  onClick={() => {}}
                  text="View Image"
                />
              </Link>
            )}
            <InteractableButton
              icon={<RiAlarmWarningLine />}
              disabled={false}
              tooltip="You already reported this image"
              text="Report"
              onClick={() => {}}
            />
          </Flex>
        </Flex>
        <VStack p={4}>
          <PlayerList />
        </VStack>
      </VStack>
    </Grid>
  )
}

export const PlayerIcon = ({
  seat,
  status,
}: {
  seat: ClientSeat
  status: React.ReactNode
}) => {
  return (
    <VStack alignItems="center">
      <Image src={seat.player.imageUrl} h={14} w={14} borderRadius="md" />
      <Text textStyle="text-sm">{status}</Text>
    </VStack>
  )
}

const PlayerList = () => {
  const room = useSelector((r) => r.game?.room)
  if (!room) {
    return null
  }
  const sortedSeats = Object.values(room.seats).sort(
    (a, b) => b.points - a.points
  )
  return (
    <VStack spacing={4}>
      <Text textStyle="heading-sm">Leaderboard</Text>
      <Flex>
        {sortedSeats.map((seat) => (
          <Box mr={2} mb={2} key={seat.player.id}>
            <PlayerIcon seat={seat} status={`${seat.points} points`} />
          </Box>
        ))}
      </Flex>
    </VStack>
  )
}
