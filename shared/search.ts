import {
  SearchOptions,
  SearchParams,
  SearchResponse,
} from "typesense/lib/Typesense/Documents"
import { SearchClient } from "typesense"

export const searchGroupsName = () =>
  process.env.NODE_ENV === "production" ? "groups" : "groups_test"

export const searchPeopleName = () =>
  process.env.NODE_ENV === "production" ? "people" : "people_test"

type SearchInput = Omit<SearchParams<any>, "q" | "group_by"> & {
  collection: string
}

export const queryFieldsBy = <T>(
  client: SearchClient,
  {
    collection,
    options = { cacheSearchResultsForSeconds: 30 },
    ...opts
  }: SearchInput & { options?: SearchOptions }
) => async (query: string): Promise<SearchResponse<T>> => {
  return (await client
    .collections(collection)
    .documents()
    .search(
      {
        q: query,
        ...opts,
      },
      options
    )) as any
}

export const SEARCH_ENGINE_RESULT_PER_PAGE = 6

export const searchIdol = (client: SearchClient) =>
  queryFieldsBy<IndexedPerson>(client, {
    collection: "people",
    query_by: "aliases,name",
    per_page: SEARCH_ENGINE_RESULT_PER_PAGE,
  })

const sharedFetchOptions = {
  query_by: "name",
  per_page: 250,
} as const

export const getGroupsById = (client: SearchClient, ids: number[]) =>
  queryFieldsBy<IndexedGroup>(client, {
    collection: searchGroupsName(),
    filter_by: `id:[${ids}]`,
    ...sharedFetchOptions,
  })("*")

export const getPeopleById = (client: SearchClient, ids: number[]) =>
  queryFieldsBy<IndexedPerson>(client, {
    collection: searchPeopleName(),
    filter_by: `id:[${ids}]`,
    ...sharedFetchOptions,
  })("*")

export const getPeopleByGroupId = (client: SearchClient, groupIds: number[]) =>
  queryFieldsBy<IndexedPerson>(client, {
    collection: searchPeopleName(),
    filter_by: `groups:[${groupIds}]`,
    ...sharedFetchOptions,
  })("*")

export type IndexedPerson = {
  id: string
  personId: number
  name: string
  age?: number
  aliases: string[]
  preferredAlias?: string
  // group ids
  groups: number[]
}

export type IndexedTag = {
  id: string
  name: string
  aliases: string[]
  category?: string
  count: number
}

export type IndexedGroup = {
  id: string
  groupId: number
  name: string
  aliases: string[]
  members: number[]
}
