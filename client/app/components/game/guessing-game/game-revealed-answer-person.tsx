import { Box, forwardRef, Image, Text } from "@chakra-ui/react"
import React from "react"

export type GameRevealedAnswerUserProps = {
  avatar?: string
  name: string
  hintUsed?: boolean
}

export const GameRevealedAnswerUser = forwardRef<
  GameRevealedAnswerUserProps,
  "div"
>(({ hintUsed, avatar, name, ...props }, ref) => {
  return (
    <Box ref={ref} {...props} mb={3} mr={3}>
      <Box position="relative" overflow="hidden" borderRadius="lg">
        <Image src={avatar} w={12} h={12} key={name} />
        {hintUsed && (
          <Text
            position="absolute"
            bg="rgba(0, 0, 0, 0.4)"
            bottom={0}
            fontSize="10px"
            textAlign="center"
            fontWeight="bold"
            w="full"
          >
            Hinted
          </Text>
        )}
      </Box>
    </Box>
  )
})
