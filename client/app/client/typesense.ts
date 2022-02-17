import {
  queryFieldsBy,
  SEARCH_ENGINE_RESULT_PER_PAGE,
} from "@/../shared/search"
import { SearchClient } from "typesense"
import type { NodeConfiguration } from "typesense/lib/Typesense/Configuration"
import type {
  SearchOptions,
  SearchParams,
  SearchResponse,
} from "typesense/lib/Typesense/Documents"
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
  preferredAlias?: string
}

export type SearchTag = {
  id: string
  name: string
  aliases?: string[]
  category: string
  count: number
}

export const searchIdol = queryFieldsBy<SearchIdol>(typesense, {
  collection: "people",
  query_by: "aliases,name",
  per_page: SEARCH_ENGINE_RESULT_PER_PAGE,
})

export const searchGroup = queryFieldsBy<SearchGroup>(typesense, {
  collection: "groups",
  query_by: "aliases,name",
  per_page: SEARCH_ENGINE_RESULT_PER_PAGE,
})

export const searchTag = queryFieldsBy<SearchTag>(typesense, {
  collection: "tags",
  query_by: "aliases,name",
  per_page: SEARCH_ENGINE_RESULT_PER_PAGE,
  options: {
    // tagging search happens very quickly
    // we don't want it to be cached
    cacheSearchResultsForSeconds: 0,
  },
})

export const searchGeneric = async (
  query: string,
  commonParams: Partial<MultiSearchRequestSchema<unknown>> = {
    per_page: SEARCH_ENGINE_RESULT_PER_PAGE,
  }
): Promise<[SearchResponse<SearchIdol>, SearchResponse<SearchGroup>]> => {
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
