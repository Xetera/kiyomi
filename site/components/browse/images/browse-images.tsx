import {
  BrowsePageDocument,
  BrowsePageQuery,
  BrowsePageQueryVariables,
  fetcher,
  HomepagePersonDocument,
  HomepagePersonQuery,
  useBrowsePageQuery,
} from "@/lib/__generated__/graphql"
import ImageGrid from "@/components/data-grids/image-grid"
import React from "react"
import { Box, VStack } from "@chakra-ui/react"
import { Waypoint } from "react-waypoint"
import { useInfiniteQuery } from "react-query"
import { paginateBySkip } from "@/client/pagination"
import { usePaginated } from "@/hooks/use-paginated"

const PER_PAGE = 30

export const BrowseImages = () => {
  const { data, waypoint } = usePaginated<
    BrowsePageQuery,
    BrowsePageQueryVariables
  >({
    perPage: PER_PAGE,
    document: BrowsePageDocument,
    queryKey: "BrowsePageImages",
  })
  if (!data) return null
  return (
    <VStack w="full">
      <ImageGrid w="full" images={data.pages.flatMap((page) => page.images)} />

      <Box height="800px">{waypoint}</Box>
    </VStack>
  )
}
