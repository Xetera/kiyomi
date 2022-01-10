import { Image, Flex, Text, VStack } from "@chakra-ui/react"
import React from "react"

export type GameRevealedAnswerProps = {
  avatar?: string
  name: string
  aliases: string[]
  people: Array<{
    avatar?: string
    name: string
  }>
}
export const GameRevealedAnswer = ({
  name,
  aliases,
  avatar,
  people,
}: GameRevealedAnswerProps) => {
  return (
    <VStack>
      <Image src={avatar} w={8} h={8} />
      <Text>{name}</Text>
      {people.length === 0 && <Text>Huh, nobody guessed this one</Text>}
      {/*<Text as="pre">{JSON.stringify(players, null, 2)}</Text>*/}
    </VStack>
  )
}
