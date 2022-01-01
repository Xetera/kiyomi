import { Box, VStack } from "@chakra-ui/react"
import { WithBrowsePageSidebar } from "@/components/browse/browse-base"
import {
  BrowsePageIdolsDocument,
  BrowsePageIdolsQuery,
  BrowsePageIdolsQueryVariables,
  BrowsePageIdolsWithFilterDocument,
} from "@/lib/__generated__/graphql"
import { usePaginated } from "@/hooks/use-paginated"
import React, { useState } from "react"
import IdolGrid from "@/components/data-grids/idol-grid"
import {
  GroupSearchResult,
  SidebarSearch,
} from "@/components/discover/sidebar-search"
import { SearchFilterHandle, useSearchFilter } from "@/hooks/useSearchFilter"

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
  const groupIds = filters.filters.map((f) => f.id)
  const { data, waypoint } = usePaginated<
    BrowsePageIdolsQuery,
    BrowsePageIdolsQueryVariables
  >({
    queryKey:
      groupIds.length > 0
        ? ["BrowsePageIdolsWithFilter", groupIds]
        : ["BrowsePageIdols"],
    document:
      groupIds.length > 0
        ? BrowsePageIdolsWithFilterDocument
        : BrowsePageIdolsDocument,
    perPage: 30,
    variables() {
      return {
        groups: groupIds,
      }
    },
  })
  return (
    <WithBrowsePageSidebar>
      <VStack>
        <BrowseIdolsSidebar {...filters} />
      </VStack>
      <VStack w="full">
        <IdolGrid
          w="full"
          people={data?.pages.flatMap((page) => page.people) ?? []}
        />

        <Box height="800px">{waypoint}</Box>
      </VStack>
    </WithBrowsePageSidebar>
  )
}
