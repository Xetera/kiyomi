import { WithNavbar } from "@/components/navbar"
import { useDiscoveredPostsQuery } from "@/lib/__generated__/graphql"
import { DiscoveredPost } from "@/components/discovered-post"
import { Box, Grid, Image } from "@chakra-ui/react"
import { LargeBanner } from "@/components/large-banner"

export default function QueuePage() {
  const { data } = useDiscoveredPostsQuery()
  console.log({ data })
  return (
    <WithNavbar>
      <LargeBanner
        url="https://my.simp.pics/hSlmZTcu4ZNITd9D.webp"
        height={["14vh", "20vh", "35vh"]}
      />
      <Grid mx="auto" maxW="xl" zIndex={10} gap={4} autoFlow="row">
        {data?.discoveredPosts.map((post) => (
          <DiscoveredPost
            post={post}
            key={`${post.providerType}-${post.uniqueIdentifier}`}
          />
        ))}
      </Grid>
    </WithNavbar>
  )
}
