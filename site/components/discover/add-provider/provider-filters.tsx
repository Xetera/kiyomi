import { SearchFilterHandle } from "@/hooks/useSearchFilter"
import React, { useState } from "react"
import {
  GroupSearchResult,
  SidebarSearch,
} from "@/components/discover/sidebar-search"

export const ProviderFilterGroup = (props: SearchFilterHandle) => {
  const [hits, setHits] = useState<GroupSearchResult[]>([])
  return (
    <SidebarSearch
      searchType="group"
      alignSelf="flex-start"
      placeholder="Filter by group"
      setHits={setHits}
      hits={hits}
      {...props}
    />
  )
}
