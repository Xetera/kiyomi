import {
  BrowsePageDocument,
  BrowsePageQuery,
  BrowsePageQueryVariables,
  fetcher,
  HomepagePersonDocument,
  HomepagePersonQuery,
  useBrowsePageQuery,
} from "@/lib/__generated__/graphql"
import ImageGrid from "@/components/image-grid"
import React from "react"
import { Box, VStack } from "@chakra-ui/react"
import { Waypoint } from "react-waypoint"
import { useInfiniteQuery } from "react-query"
import { paginateBySkip } from "@/client/pagination"

const PER_PAGE = 30

export const BrowsePage = () => {
  const [page, setPage] = React.useState(0)
  const {
    data,
    isFetching,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery<BrowsePageQuery>(
    ["BrowsePage", page],
    ({ pageParam = 0 }) => {
      return fetcher<BrowsePageQuery, BrowsePageQueryVariables>(
        BrowsePageDocument,
        { skip: pageParam, take: PER_PAGE }
      )()
    },
    {
      refetchOnMount: false,
      getNextPageParam: paginateBySkip(PER_PAGE),
    }
  )
  function loadMore() {
    if (isFetching) {
      return
    }
    fetchNextPage()
  }
  if (!data) return null
  return (
    <VStack w="full">
      <ImageGrid w="full" images={data.pages.flatMap((page) => page.images)} />

      <Box height="800px">
        <Waypoint onEnter={loadMore} topOffset="-1500px" />
      </Box>
    </VStack>
  )
}
