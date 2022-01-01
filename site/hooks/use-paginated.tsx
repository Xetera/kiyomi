import React from "react"
import {
  BrowsePageDocument,
  BrowsePageQuery,
  BrowsePageQueryVariables,
  fetcher,
} from "@/lib/__generated__/graphql"
import { paginateBySkip } from "@/client/pagination"
import { useInfiniteQuery } from "react-query"
import { Waypoint } from "react-waypoint"

export type UsePaginatedOptions<K> = {
  perPage: number
  queryKey: string | any[]
  document: string
  variables?: (opts: { pageParam: number }) => Omit<K, "skip" | "take">
}

export const usePaginated = <T, K>({
  perPage,
  queryKey,
  document,
  variables,
}: UsePaginatedOptions<K>) => {
  const query = useInfiniteQuery(
    queryKey,
    ({ pageParam = 0 }) => {
      return fetcher<T, K>(document, {
        ...(variables?.({ pageParam }) ?? {}),
        skip: pageParam,
        take: perPage,
      } as any)()
    },
    {
      refetchOnMount: false,
      getNextPageParam: paginateBySkip(perPage),
    }
  )

  function loadMore() {
    if (query.isFetching) {
      return
    }
    query.fetchNextPage()
  }

  const waypoint = <Waypoint onEnter={loadMore} topOffset="-1500px" />
  return {
    ...query,
    waypoint,
  }
}
