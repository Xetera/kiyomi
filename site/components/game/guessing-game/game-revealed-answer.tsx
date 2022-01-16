import { Box, Flex, HStack, Link, Text, VStack } from "@chakra-ui/react"
import React from "react"
import { Portrait } from "@/components/portrait"
import {
  GameRevealedAnswerUser,
  GameRevealedAnswerUserProps,
} from "@/components/game/guessing-game/game-revealed-answer-person"
import NextLink from "next/link"
import { Routing } from "@/client/routing"
import { Stack } from "@chakra-ui/layout"

export type GameRevealedAnswerProps = {
  avatar?: string
  personId: number
  name: string
  aliases: string[]
  preferredAlias?: string
  isCorrect?: boolean
  preferredGroupName?: string
  people: GameRevealedAnswerUserProps[]
}
export const GameRevealedAnswer = ({
  personId,
  name,
  aliases,
  avatar,
  preferredGroupName,
  preferredAlias,
  people,
  isCorrect,
}: GameRevealedAnswerProps) => {
  const preferredName = preferredAlias ?? name
  return (
    <Stack alignItems="flex-start" spacing={6} direction={["column", "row"]}>
      <NextLink href={Routing.toPerson(personId, preferredName)} passHref>
        <Link target="_blank">
          <Portrait
            opacity={isCorrect ? 1 : 0.4}
            height="250px"
            width="150px"
            src={avatar}
          />
        </Link>
      </NextLink>
      <VStack spacing={4} py={3}>
        <VStack spacing={0}>
          <Text textStyle="heading">{preferredName}</Text>
          {preferredGroupName && (
            <Text color="gray.400" fontSize="16px">
              From{" "}
              <Box as="span" fontWeight="medium">
                {preferredGroupName}
              </Box>
            </Text>
          )}
        </VStack>
        {people.length > 0 && (
          <VStack spacing={2}>
            <Text textStyle="heading-sm" fontSize="12px" color="gray.400">
              Guesses
            </Text>
            <Flex flexFlow="row wrap">
              {people.map((person, i) => {
                return <GameRevealedAnswerUser {...person} key={i} />
              })}
            </Flex>
          </VStack>
        )}
      </VStack>
    </Stack>
  )
}
