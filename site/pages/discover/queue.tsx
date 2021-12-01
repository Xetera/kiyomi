import { WithNavbar } from "@/components/navbar"
import { useDiscoveredPostsQuery } from "@/lib/__generated__/graphql"
import { DiscoveredPost } from "@/components/discover/discovered-post"
import { Grid, Text, Image, VStack } from "@chakra-ui/react"
import { LargeBanner } from "@/components/large-banner"
import DiscoverTabs from "@/components/discover/tabs"
import DiscoverSidebar from "@/components/discover/sidebar"

export default function QueuePage() {
  const { data, isLoading, isError } = useDiscoveredPostsQuery()

  const discover = (
    <Grid
      as="main"
      templateColumns={["1fr", null, null, "1fr 2fr"]}
      templateRows={"auto"}
      autoFlow={["row", null, null, "column"]}
      gap={6}
    >
      <DiscoverSidebar />
      <Grid zIndex={10} gap={4} autoFlow="row">
        {data && data.discoveryFeed.length === 0 && (
          <VStack spacing={4} align="flex-start">
            <Text textStyle="text">
              Wow... you've gone through every single post that needs to be
              reviewed. More content will pop up here as images get posted on
              social media.
            </Text>
            <Image
              src="https://img.kiyomi.io/GW6IjQuBX2YBoosn.webp"
              borderRadius="md"
            />
            <Text textStyle="heading-sm" textAlign="center" w="full">
              Thank you for your hard work!
            </Text>
          </VStack>
        )}
        {data?.discoveryFeed.map((post) => (
          <DiscoveredPost
            post={post}
            key={`${post.providerType}-${post.uniqueIdentifier}`}
          />
        ))}
      </Grid>
    </Grid>
  )
  return (
    <WithNavbar>
      <LargeBanner
        url="https://img.kiyomi.io/fKgpCdJxphzlsWqy.webp"
        height={["14vh", "20vh", "20vh"]}
        objectPosition="50% 24%"
      />
      <VStack mx="auto" maxW="6xl" w="full">
        <DiscoverTabs discover={discover} />
      </VStack>
    </WithNavbar>
  )
}
