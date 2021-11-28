import { WithNavbar } from "@/components/navbar"
import { useDiscoveredPostsQuery } from "@/lib/__generated__/graphql"
import { DiscoveredPost } from "@/components/discover/discovered-post"
import { Grid, VStack } from "@chakra-ui/react"
import { LargeBanner } from "@/components/large-banner"
import DiscoverTabs from "@/components/discover/tabs"
import DiscoverSidebar from "@/components/discover/sidebar"

export default function QueuePage() {
  const { data } = useDiscoveredPostsQuery()

  const discover = (
    <Grid
      templateColumns={["1fr", null, "1fr 2fr"]}
      autoFlow={["row", "column"]}
      gap={6}
    >
      <DiscoverSidebar />
      <Grid zIndex={10} gap={4} autoFlow="row">
        {data?.discoveredPosts.map((post) => (
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
        url="https://my.simp.pics/fKgpCdJxphzlsWqy.webp"
        height={["14vh", "20vh", "35vh"]}
        objectPosition="50% 24%"
      />
      <VStack mx="auto" maxW="6xl" w="full">
        <DiscoverTabs discover={discover} />
      </VStack>
    </WithNavbar>
  )
}
