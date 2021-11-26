import * as g from "@/lib/__generated__/graphql"
import { QueryClient } from "react-query"
import { dehydrate } from "react-query/hydration"

export async function prefetchPartial(
  key: Extract<keyof typeof g, `${string}Document`> extends `${infer R}Document`
    ? R
    : never,
  variables?: Record<string, unknown>,
  client = new QueryClient()
): Promise<QueryClient> {
  const document = g[key + "Document"]
  await client.prefetchQuery(
    [key, variables],
    g.fetcher(document, variables),
    {}
  )
  return client
}

export async function prefetchQuery(
  key: Extract<keyof typeof g, `${string}Document`> extends `${infer R}Document`
    ? R
    : never,
  variables?: Record<string, unknown>,
  client = new QueryClient()
) {
  const document = g[key + "Document"]

  await client.prefetchQuery(
    [key, variables],
    g.fetcher(document, variables),
    {}
  )
  return dehydrate(client)
}
