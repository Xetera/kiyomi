import {
  BrowsePageDocument,
  BrowsePageQuery,
  BrowsePageQueryVariables,
} from "~/__generated__/graphql"
import ImageGrid from "~/components/data-grids/image-grid"
import React from "react"
import { Box, VStack } from "@chakra-ui/react"
import { usePaginated } from "~/hooks/use-paginated"
import { toClickableGridImage } from "~/client/data-mappers/image"

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
      <ImageGrid
        w="full"
        images={data.pages.flatMap((page) =>
          page.images.map(toClickableGridImage)
        )}
      />

      <Box height="800px">{waypoint}</Box>
    </VStack>
  )
}
