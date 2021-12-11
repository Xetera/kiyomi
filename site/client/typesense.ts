import { SearchClient } from "typesense"
import type { NodeConfiguration } from "typesense/lib/Typesense/Configuration"
import type { SearchResponse } from "typesense/lib/Typesense/Documents"
import type { MultiSearchRequestSchema } from "typesense/lib/Typesense/MultiSearch"

export const typesense = new SearchClient({
  apiKey: process.env.NEXT_PUBLIC_TYPESENSE_KEY!,
  nodes: [
    {
      url: process.env.NEXT_PUBLIC_TYPESENSE_URL,
    } as NodeConfiguration,
  ],
})

export type SearchGroup = {
  id: string
  groupId: number
  name: string
  aliases: string[]
}

export type SearchIdol = {
  id: string
  personId: number
  name: string
  aliases: string[]
}

export const searchIdol = async (
  query: string
): Promise<SearchResponse<SearchIdol>> => {
  return (await typesense.collections("people").documents().search(
    {
      q: query,
      query_by: "name,aliases",
      // highlight_fields: false
    },
    { cacheSearchResultsForSeconds: 30 }
  )) as any
}

export const searchGeneric = async (
  query: string,
  commonParams: Partial<MultiSearchRequestSchema<unknown>> = { per_page: 6 }
): Promise<Array<SearchResponse<SearchGroup | SearchIdol>>> => {
  const response = await typesense.multiSearch.perform(
    {
      searches: [
        {
          collection: "people",
          q: query,
          query_by: "name,aliases",
        },
        {
          collection: "groups",
          q: query,
          query_by: "name,aliases",
        },
      ],
    },
    commonParams,
    { cacheSearchResultsForSeconds: 20 }
  )
  // typesense doesn't support this for some reason
  return response.results as any
}
