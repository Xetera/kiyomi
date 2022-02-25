import { createModel } from "@rematch/core"
import { RootModel } from "~/models/state/index"
import { UserDataQuery } from "~/__generated__/graphql"

type UserModel = {
  cache: UserDataQuery["me"] | undefined
}

export const userModel = createModel<RootModel>()({
  name: "user",
  state: {
    cache: undefined,
  } as UserModel,
  reducers: {
    overrideState(state, user: UserDataQuery["me"]) {
      state.cache = user
      return state
    },
  },
})
