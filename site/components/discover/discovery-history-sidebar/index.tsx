import { UserPortrait } from "@/components/discover/user-portrait"
import { useSelector } from "react-redux"
import { RootState } from "@/models/store"
import { useDiscoveryLeaderboardQuery } from "@/lib/__generated__/graphql"
import { Flex, HStack, Text, VStack } from "@chakra-ui/react"

export const DiscoveryHistorySidebar = () => {
  const me = useSelector((root: RootState) => root.user?.cache)
  const { data } = useDiscoveryLeaderboardQuery()

  return (
    <VStack spacing={8}>
      {me && (
        <UserPortrait
          username={me?.name ?? undefined}
          xp={me?.xp ?? undefined}
          avatar={me?.avatar ?? undefined}
          avatarSize={14}
        />
      )}
      <VStack spacing={4} w="full">
        <Text textStyle="heading">Leaderboard</Text>
        <VStack spacing={4} w="full">
          {data?.discoveryLeaderboard.map((stat) => {
            const isMe = stat.user.id === me?.id
            return (
              <HStack key={stat.user.id} align="center" spacing={6} w="full">
                <Flex color="gray.300" fontWeight="bold" fontSize="18">
                  {stat.rank}
                </Flex>
                <UserPortrait
                  highlight={isMe}
                  username={stat.user.name ?? undefined}
                  xp={stat.xp ?? undefined}
                  avatar={stat.user.avatar ?? undefined}
                  avatarSize={12}
                  bot={stat.user.bot}
                  right={
                    isMe && (
                      <Text color="brand.200" fontWeight="bold">
                        You
                      </Text>
                    )
                  }
                />
              </HStack>
            )
          })}
        </VStack>
      </VStack>
    </VStack>
  )
}
