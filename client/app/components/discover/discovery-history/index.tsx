import {
  DiscoveryHistoryDocument,
  DiscoveryHistoryQuery,
  DiscoveryHistoryQueryVariables,
  fetcher,
} from "~/__generated__/graphql"
import { useInfiniteQuery } from "react-query"
import { Paginatable } from "~/components/paginatable"
import { DiscoveredPost } from "~/components/discover/discovered-post"

export const DiscoveryHistory = () => {
  const { data, isFetching, fetchNextPage } = useInfiniteQuery(
    ["DiscoveryHistory"],
    ({ pageParam = 0 }) => {
      return fetcher<DiscoveryHistoryQuery, DiscoveryHistoryQueryVariables>(
        DiscoveryHistoryDocument,
        {
          take: 10,
          skip: 0,
        }
      )()
    },
    {
      refetchOnMount: false,
      refetchInterval: false,
    }
  )
  const feed = data?.pages.flatMap((e) => e.discoveryHistory)

  function loadMore() {
    if (isFetching) return
    fetchNextPage()
  }

  return (
    <Paginatable loadMore={loadMore}>
      {feed?.map((page) => (
        <DiscoveredPost post={page} key={page.id} />
      ))}
    </Paginatable>
  )
}
