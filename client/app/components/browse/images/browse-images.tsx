// @ts-ignore
import { InfiniteScroll } from "react-simple-infinite-scroll"
import ImageGrid from "~/components/data-grids/image-grid"
import React from "react"
import { Box, VStack } from "@chakra-ui/react"
import { usePaginated } from "~/hooks/use-paginated"
import { toClickableGridImage } from "~/client/data-mappers/image"
import { useFetcher } from "remix"
import { ImageBrowseLoaderContext } from "~/routes/browse/__browse-context/index"

const PER_PAGE = 30

export const BrowseImages = () => {
  const fetcher = useFetcher<ImageBrowseLoaderContext>()
  const pagination = usePaginated(fetcher, {
    href: "/browse",
    transform: (data) => data.images,
    perPage: PER_PAGE,
  })

  return (
    <VStack w="full">
      <InfiniteScroll
        throttle={100}
        threshold={3000}
        isLoading={pagination.fetcher.state === "loading"}
        hasMore={true}
        onLoadMore={pagination.loadMore}
      >
        <ImageGrid
          width="full"
          images={pagination.data.map(toClickableGridImage)}
        />
      </InfiniteScroll>
    </VStack>
  )
}
