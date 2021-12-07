import { ClientRoomPreview } from "../../../shared/game"
import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/layout"
import { useMemo } from "react"
import {
  Button,
  HStack,
  Image,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react"
import NextLink from "next/link"
import { useSelector } from "react-redux"
import { RootState } from "@/models/store"

interface GameLobbyRowParams {
  room: ClientRoomPreview
}

const baseProps = {
  py: 4,
  px: 5,
}

const MAX_AVATAR_DISPLAY = 4

export default function GameLobbyRow({ room }: GameLobbyRowParams) {
  const currentRoomSlug = useSelector((root: RootState) => root.game.room?.slug)
  const players = useMemo(() => room.players.slice(0, MAX_AVATAR_DISPLAY), [
    room,
  ])
  const textProps = {
    fontSize: ["xs", "sm", "md"],
  }
  return (
    <Flex
      {...baseProps}
      justifyContent="space-between"
      borderRadius={3}
      flex={1}
      width="100%"
      background="bgSecondary"
    >
      <Flex justifyContent="space-between" flexFlow="column">
        <Flex alignItems="center" mb={3}>
          <Heading mr={2} {...textProps}>
            {room.name}
          </Heading>
          <Text color="gray.600" {...textProps}>
            #{room.slug}
          </Text>
        </Flex>
        <HStack spacing={2}>
          {players.map((player) => (
            <Image
              src={player.imageUrl}
              key={player.id}
              borderRadius="999px"
              width="30px"
              height="30px"
            />
          ))}
          {room.players.length >= MAX_AVATAR_DISPLAY && (
            <Flex
              width="30px"
              height="30px"
              fontSize="xs"
              borderRadius="999px"
              background="bgPrimary"
              alignItems="center"
              justifyContent="center"
            >
              +{room.players.length - MAX_AVATAR_DISPLAY}
            </Flex>
          )}
        </HStack>
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="flex-end"
        flexFlow="column"
      >
        <Grid gridAutoFlow="column" gap={2} color="gray.400" mb={3}>
          {/*<Flex {...textProps}>*/}
          {/*  <b>{room.selectedPeople ?? "unknown"}</b> person pool*/}
          {/*</Flex>*/}
          <Flex {...textProps} fontSize={["xs", null, "sm"]}>
            <b>{room.players.length}</b>/{room.maxPlayers} players
          </Flex>
        </Grid>
        <NextLink href={`/games/room/${room.slug}`}>
          <Button
            width="min-content"
            {...textProps}
            size="sm"
            isDisabled={room.started}
          >
            <Text fontSize="sm">
              {room.started && "Ongoing game"}
              {!room.started &&
                (room.slug === currentRoomSlug ? "Go to room" : "Join room")}
            </Text>
          </Button>
        </NextLink>
      </Flex>
    </Flex>
  )
}

export function GameLobbyRowSkeleton() {
  const random = useMemo(() => Math.random(), [])
  return (
    <Flex
      width="100%"
      {...baseProps}
      background="bgSecondary"
      flexFlow="column"
    >
      <Flex mb={2}>
        <Skeleton
          mr={2}
          width={`${Math.floor(random * 100) + 20}px`}
          noOfLines={1}
          height="12px"
        />
        <Skeleton mb={2} width={`30px`} noOfLines={1} height="12px" />
      </Flex>
      <SkeletonCircle />
    </Flex>
  )
}
