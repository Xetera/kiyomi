import { Models } from "@rematch/core"
import { gameModel } from "./game"
import { searchModel } from "./search"

export interface RootModel extends Models<RootModel> {
  game: typeof gameModel
  search: typeof searchModel
}

export const models: RootModel = { game: gameModel, search: searchModel }
