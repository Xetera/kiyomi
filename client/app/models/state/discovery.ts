import { createModel } from "@rematch/core"
import { RootModel } from "~/models/state/index"
import { searchGeneric, SearchGroup } from "~/client/typesense"
import { SearchResponseHit } from "typesense/lib/Typesense/Documents"
import { SearchTag } from "~/components/discover/search-tags"

type GroupResult = Array<SearchResponseHit<SearchGroup>>

type DiscoveryModel = {
  query: string
  searchFilter: SearchTag[]
}

export const discoveryModel = createModel<RootModel>()({
  name: "discovery",
  state: {
    query: "",
    searchFilter: [],
  } as DiscoveryModel,
  reducers: {
    setSearch(state, query: string) {
      state.query = query
      return state
    },
    removeFilter(state, tag: SearchTag) {
      const index = state.searchFilter.findIndex(
        (f) => f.type === tag.type && f.id === tag.id
      )
      if (index === -1) {
        console.warn(`Group with id ${tag.id} is not in redux`)
        return state
      }
      state.searchFilter.splice(index, 1)
      return state
    },
    addFilter(state, tag: SearchTag) {
      state.searchFilter.push(tag)
      return state
    },
  },
  effects(dispatch) {
    return {
      async runSearch(query: string) {
        const result = await searchGeneric(query)
        const [idols, groups] = result

        dispatch.search.receive({
          idols: idols?.hits ?? [],
          groups: groups?.hits ?? [],
        })
      },
    }
  },
})
