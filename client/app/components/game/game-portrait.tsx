import { Flex, Text } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/react"
import React, { PropsWithChildren } from "react"

export type GamePortraitProps = {
  avatar?: string
  name: string
}

export const GamePortrait = ({
  avatar,
  name,
  children,
}: PropsWithChildren<GamePortraitProps>) => {
  return (
    <Flex alignItems="center" px={[3, 4, 5]} py={[2, 3, 4]}>
      <Image
        src={avatar ?? "#"}
        width="40px"
        height="40px"
        borderRadius="999px"
        mr={3}
      />
      <Flex flexFlow="column">
        <Text fontSize="sm" fontWeight="bold">
          {name}
        </Text>
        {children}
      </Flex>
    </Flex>
  )
}
