import * as g from "@/lib/__generated__/graphql"
import { QueryClient } from "react-query"
import { dehydrate } from "react-query/hydration"
import { contextResolver } from "@/lib/context"
import { prisma } from "./db"
import { IncomingMessage, ServerResponse } from "http"

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

type PrefetchDocumentKey = Extract<
  keyof typeof g,
  `${string}Document`
> extends `${infer R}Document`
  ? R
  : never

export const buildStaticPrefetcher = (): typeof prefetchQuery => {
  return (
    key: PrefetchDocumentKey,
    variables?: Record<string, unknown>,
    client = new QueryClient()
  ) =>
    prefetchQuery(
      key,
      variables,
      client,
      {
        headers: new Headers(),
        url: "",
        method: "GET",
      },
      { prisma }
    )
}

export const buildPrefetcher = (
  req: IncomingMessage,
  res: ServerResponse
): typeof prefetchQuery => {
  return async (
    key: PrefetchDocumentKey,
    variables?: Record<string, unknown>,
    client = new QueryClient()
  ) => {
    const ctx = await contextResolver({
      req,
      res,
    })
    return prefetchQuery(
      key,
      variables,
      client,
      {
        // @ts-ignore I'm pretty sure you can still pass a regular header object here but it asks for the Headers class?
        headers: req.headers,
        url: req.url!,
        method: req.method ?? "GET",
      },
      ctx
    )
  }
}

export async function prefetchQuery(
  key: PrefetchDocumentKey,
  variables?: Record<string, unknown>,
  client = new QueryClient(),
  req?: Pick<Request, "url" | "method" | "headers">,
  ctx?: any
) {
  const document = g[key + "Document"]

  console.log("help")
  const callGraphqlServer = await import("@/pages/api/graphql").then(
    (r) => r.callGraphqlServer
  )

  const results = await callGraphqlServer(
    {
      http: req,
      query: document,
      variables,
    },
    ctx
  )

  if (results.data) {
    const serializeSafeData = JSON.parse(JSON.stringify(results.data))
    client.setQueryData([key, variables], serializeSafeData)
  }

  return dehydrate(client)
}
