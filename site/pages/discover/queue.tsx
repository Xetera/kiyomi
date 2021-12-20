import { WithNavbar } from "@/components/navbar"
import {
  DiscoveredPostsDocument,
  DiscoveredPostsQuery,
  DiscoveredPostsQueryVariables,
  fetcher,
} from "@/lib/__generated__/graphql"
import { DiscoveredPost } from "@/components/discover/discovered-post"
import { Box, Image, Text, VStack } from "@chakra-ui/react"
import { LargeBanner } from "@/components/large-banner"
import DiscoverTabs from "@/components/discover/tabs"
import React from "react"
import { useInfiniteQuery } from "react-query"
import { Waypoint } from "react-waypoint"
import { paginateBySkip } from "@/client/pagination"
import { useSelector } from "react-redux"
import { RootState } from "@/models/store"
import { DiscoveryHistory } from "@/components/discover/discovery-history"

const PER_PAGE = 10

function Queue() {
  const filters = useSelector((root: RootState) => root.discovery?.searchFilter)
  const groupIds = filters.filter((f) => f.type === "group").map((f) => f.id)
  const { data, isFetching, fetchNextPage } = useInfiniteQuery(
    // kinda yikes?
    ["DiscoveredPosts", groupIds],
    ({ pageParam = 0 }) => {
      return fetcher<DiscoveredPostsQuery, DiscoveredPostsQueryVariables>(
        DiscoveredPostsDocument,
        {
          skip: pageParam,
          take: PER_PAGE,
          groupIds,
          // TODO: implement
          peopleIds: [],
        }
      )()
    },
    {
      refetchOnMount: false,
      refetchInterval: false,
      // refetching this data can cause the page to shift
      staleTime: 1000 * 60,
      getNextPageParam: paginateBySkip(PER_PAGE),
    }
  )
  const feed = data?.pages.flatMap((e) => e.discoveryFeed)

  function loadMore() {
    if (isFetching) return
    fetchNextPage()
  }

  return (
    <>
      {feed && feed.length === 0 && filters.length === 0 && (
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

export default function QueuePage() {
  return (
    <WithNavbar>
      <LargeBanner
        url={`${process.env.NEXT_PUBLIC_BASE_URL_CDN}/fKgpCdJxphzlsWqy.webp`}
        height={["14vh", "20vh", "20vh"]}
        objectPosition="50% 24%"
      />
      <VStack mx="auto" maxW="6xl" w="full">
        <DiscoverTabs queue={<Queue />} history={<DiscoveryHistory />} />
      </VStack>
    </WithNavbar>
  )
}
