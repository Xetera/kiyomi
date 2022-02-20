import { Box, VStack } from "@chakra-ui/react"
import { WithBrowsePageSidebar } from "~/components/browse/browse-base"
// @ts-ignore
import { InfiniteScroll } from "react-simple-infinite-scroll"
import { usePaginated } from "~/hooks/use-paginated"
import React, { useState } from "react"
import IdolGrid from "~/components/data-grids/idol-grid"
import {
  GroupSearchResult,
  SidebarSearch,
} from "~/components/discover/sidebar-search"
import { SearchFilterHandle, useSearchFilter } from "~/hooks/useSearchFilter"
import { useFetcher } from "remix"
import { IdolBrowseLoaderContext } from "~/routes/browse/__browse-context/idols"

const BrowseIdolsSidebar = (props: SearchFilterHandle) => {
  const [hits, setHits] = useState<GroupSearchResult[]>([])
  return (
    <SidebarSearch
      searchType="group"
      placeholder="Filter by group"
      setHits={setHits}
      hits={hits}
      {...props}
    />
  )
}

export const BrowseIdols = () => {
  const filters = useSearchFilter()
  const fetcher = useFetcher<IdolBrowseLoaderContext>()
  const pagination = usePaginated(fetcher, {
    href: "/browse/idols",
    transform: (data) => data.people,
  })
  return (
    <>
      <VStack>
        <BrowseIdolsSidebar {...filters} />
      </VStack>
      <Box>
        <InfiniteScroll
          throttle={100}
          threshold={3000}
          isLoading={pagination.fetcher.state === "loading"}
          hasMore={true}
          onLoadMore={pagination.loadMore}
        >
          <IdolGrid width="full" people={pagination.data?.flat() ?? []} />
        </InfiniteScroll>
      </Box>
    </>
  )
}
