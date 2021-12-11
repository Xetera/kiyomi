import { createModel } from "@rematch/core"
import { RootModel } from "@/models/state/index"
import { searchGeneric, SearchGroup, SearchIdol } from "@/client/typesense"
import { SearchResponseHit } from "typesense/lib/Typesense/Documents"

type Idol = SearchResponseHit<SearchIdol>
type Group = SearchResponseHit<SearchGroup>

type SearchModel = {
  open: boolean
  query: string
  idols: Idol[]
  groups: Group[]
}

type ReceivePayload = {
  idols: Idol[]
  groups: Group[]
}

export const searchModel = createModel<RootModel>()({
  name: "search",
  state: {
    open: false,
    query: "",
    idols: [],
    groups: [],
  } as SearchModel,
  reducers: {
    toggleSearch(state) {
      state.open = !state.open
      return state
    },
    setSearch(state, query: string) {
      state.query = query
      return state
    },
    receive(state, { idols, groups }: ReceivePayload) {
      state.idols = idols
      state.groups = groups
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
