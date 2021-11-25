import * as g from "@/lib/__generated__/graphql"
import { QueryClient } from "react-query"
import { dehydrate } from "react-query/hydration"

export async function prefetchQuery(
  key: Extract<keyof typeof g, `${string}Document`> extends `${infer R}Document` ? R : never,
  variables?: Record<string, unknown>,
) {
  const document = g[key + "Document"]
  console.log({ document })
  const client = new QueryClient()

  await client.prefetchQuery(
    [key, variables],
    g.fetcher(document, variables),
    {},
  )
  return dehydrate(client)
}
