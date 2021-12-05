import { WithNavbar } from "@/components/navbar"
import {
  DiscoveredPostsDocument,
  DiscoveredPostsQuery,
  fetcher,
} from "@/lib/__generated__/graphql"
import { DiscoveredPost } from "@/components/discover/discovered-post"
import { Box, Grid, Image, Text, VStack } from "@chakra-ui/react"
import { LargeBanner } from "@/components/large-banner"
import DiscoverTabs from "@/components/discover/tabs"
import DiscoverSidebar from "@/components/discover/sidebar"
import React, { useState } from "react"
import { useInfiniteQuery } from "react-query"
import { Waypoint } from "react-waypoint"

const twentyFourHoursInMs = 1000 * 60 * 60 * 24
const PER_PAGE = 10

function Queue() {
  const [skip, setSkip] = useState(0)
  const { data, isFetching, fetchNextPage } = useInfiniteQuery(
    ["DiscoveredPosts", skip],
    ({ pageParam = 0 }) => {
      return fetcher<DiscoveredPostsQuery, unknown>(DiscoveredPostsDocument, {
        skip: pageParam,
        take: PER_PAGE,
      })()
    },
    {
      refetchOnMount: false,
      getNextPageParam(_, all) {
        const skip = all.length * PER_PAGE
        return skip
      },
    }
  )
  const feed = data?.pages.flatMap((e) => e.discoveryFeed)

  function loadMore() {
    if (isFetching) return
    fetchNextPage()
  }
  console.log({ feed })

  return (
    <>
      {feed && feed.length === 0 && (
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
      {feed?.map((post) => (
        <DiscoveredPost
          post={post}
          key={`${post.providerType}-${post.uniqueIdentifier}`}
        />
      ))}
      <Box height="800px">
        <Waypoint onEnter={loadMore} topOffset="-1500px" />
      </Box>
    </>
  )
}

function QueuePageInner() {
  return (
    <Grid
      as="main"
      templateColumns={["1fr", null, null, "1fr 2fr"]}
      templateRows={"auto"}
      autoFlow={["row", null, null, "column"]}
      gap={6}
    >
      <DiscoverSidebar />
      <Grid zIndex={10} gap={4} autoFlow="row">
        <Queue />
      </Grid>
    </Grid>
  )
}

export default function QueuePage() {
  return (
    <WithNavbar>
      <LargeBanner
        url="https://img.kiyomi.io/fKgpCdJxphzlsWqy.webp"
        height={["14vh", "20vh", "20vh"]}
        objectPosition="50% 24%"
      />
      <VStack mx="auto" maxW="6xl" w="full">
        <DiscoverTabs discover={<QueuePageInner />} />
      </VStack>
    </WithNavbar>
  )
}
