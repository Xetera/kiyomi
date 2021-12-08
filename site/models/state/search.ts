import { createModel } from "@rematch/core"
import { RootModel } from "@/models/state/index"
import {
  MeiliSearchGroup,
  MeiliSearchHit,
  MeiliSearchIdol,
  searchGroups,
  searchIdols,
} from "@/client/meilisearch"

type Idol = MeiliSearchHit<MeiliSearchIdol>
type Group = MeiliSearchHit<MeiliSearchGroup>

type SearchModel = {
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
    query: "",
    idols: [],
    groups: [],
  } as SearchModel,
  reducers: {
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
        const [idols, groups] = await Promise.allSettled([
          searchIdols(query),
          searchGroups(query),
        ])
        dispatch.search.receive({
          idols: idols.status === "fulfilled" ? idols.value.hits : [],
          groups: groups.status === "fulfilled" ? groups.value.hits : [],
        })
      },
    }
  },
})
