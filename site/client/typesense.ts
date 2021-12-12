import { SearchClient } from "typesense"
import type { NodeConfiguration } from "typesense/lib/Typesense/Configuration"
import type {
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
}

// not sure why group_by causes issues here
type SearchInput = Omit<SearchParams<any>, "q" | "group_by"> & {
  collection: string
}

const queryFieldsBy = <T>({ collection, ...opts }: SearchInput) => async (
  query: string
): Promise<SearchResponse<T>> => {
  return (await typesense
    .collections(collection)
    .documents()
    .search(
      {
        q: query,
        ...opts,
      },
      { cacheSearchResultsForSeconds: 30 }
    )) as any
}

const PER_PAGE = 6

export const searchIdol = queryFieldsBy<SearchIdol>({
  collection: "people",
  query_by: "aliases,name",
  per_page: PER_PAGE,
})

export const searchGroup = queryFieldsBy({
  collection: "groups",
  query_by: "aliases,name",
  per_page: PER_PAGE,
})

export const searchGeneric = async (
  query: string,
  commonParams: Partial<MultiSearchRequestSchema<unknown>> = {
    per_page: PER_PAGE,
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
