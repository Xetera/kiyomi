import { init, RematchDispatch, RematchRootState } from "@rematch/core"
import immerPlugin from "@rematch/immer"
import { models, RootModel } from "./state"

export const store = init<RootModel>({
  models: {
    ...models,
  },
  plugins: [immerPlugin()],
})

export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>
