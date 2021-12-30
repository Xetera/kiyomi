import React from "react"
import { RiHammerLine, RiShieldStarLine } from "react-icons/ri"
import {
  Maybe,
  Role,
  UserDataFragment,
  User as UserData,
} from "@/lib/__generated__/graphql"
import { Box, Text } from "@chakra-ui/layout"
import { Flex, HStack, Image, Tag } from "@chakra-ui/react"
import { UserAttribute } from "@/components/user-attribute"

export function User({
  user,
  bottom,
}: {
  user?: Maybe<
    Pick<UserData, "bot" | "name" | "image" | "avatar"> & {
      roles: Array<Pick<Role, "name">>
    }
  >
  bottom: React.ReactElement
}) {
  const imageDimensions = ["64px", "96px"]
  const isAdmin = user?.roles.find((role) => role.name === "ADMINISTRATOR")
  const isBot = Boolean(user?.bot)
  console.log({ user })
  return (
    <HStack align="top" flexFlow="row" spacing={8} w="full">
      <Box borderRadius="md" overflow="hidden">
        {user?.avatar && (
          <Image
            // @ts-ignore [something is wrong here]
            src={user.avatar}
            width={imageDimensions}
            height={imageDimensions}
          />
        )}
      </Box>
      <Flex
        alignItems="flex-start"
        flexDirection="column"
        justifyContent="center"
      >
        <Flex mb={1} alignItems="center">
          <Text
            fontSize={["md", "md", "lg", "xl"]}
            mr={2}
            fontWeight="semibold"
          >
            {user?.name ?? <i>Unknown User</i>}
          </Text>
          {isAdmin && (
            <Box data-tip="Staff member" mr={2} display="flex">
              <RiShieldStarLine height="100%" size={16} />
            </Box>
          )}
          {isBot && <UserAttribute name="Bot" />}
        </Flex>
        {bottom}
      </Flex>
    </HStack>
  )
}
