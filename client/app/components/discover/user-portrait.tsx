import { Box, Flex, HStack, Image, Text, VStack } from "@chakra-ui/react"
import { UserAttribute } from "~/components/user-attribute"

type UserPortraitProps = {
  username?: string
  xp?: number
  avatar?: string
  avatarSize?: number
  bot?: boolean
  highlight?: boolean
  right?: React.ReactNode
}

export const UserPortrait = ({
  username,
  avatar,
  xp,
  avatarSize = 16,
  bot = false,
  highlight = false,
  right,
}: UserPortraitProps) => {
  return (
    <Flex
      justify="space-between"
      w="full"
      borderRadius="lg"
      borderWidth={highlight ? "1px" : undefined}
      bg="rgba(0, 0, 0, 0.2)"
      p={3}
      align="center"
      borderColor="borderLight"
    >
      <HStack h="min-content" spacing={4} w="full">
        {avatar && (
          <Image
            src={avatar}
            w={avatarSize}
            h={avatarSize}
            borderRadius="lg"
            fallbackSrc="https://placewaifu.com/image/100"
          />
        )}
        <VStack spacing={0} align="flex-start">
          <HStack>
            <Text textStyle="heading" fontSize="md">
              {username}
            </Text>
            {bot && <UserAttribute name="Bot" />}
          </HStack>
          <Text color="gray.400" fontSize="sm">
            {xp} XP
          </Text>
        </VStack>
      </HStack>
      <Box mr={3}>{right}</Box>
    </Flex>
  )
}
