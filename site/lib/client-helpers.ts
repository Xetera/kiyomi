import * as g from "@/lib/__generated__/graphql"
import { QueryClient } from "react-query"
import { dehydrate } from "react-query/hydration"

type FilterDocuments<T> = {
  [P in keyof T]: P extends `${infer _U}Document` ? P : never
}[keyof T]

export async function prefetchQuery(
  key: FilterDocuments<typeof g>,
  variables: Record<string, unknown>
) {
  const document = g[key]
  const client = new QueryClient()

  await client.prefetchQuery(
    [key, variables],
    g.fetcher(document, variables),
    {}
  )
  return dehydrate(client)
}
