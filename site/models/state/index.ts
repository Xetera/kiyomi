import { Models } from "@rematch/core"
import { gameModel } from "./game"
import { searchModel } from "./search"
import { discoveryModel } from "@/models/state/discovery"

export interface RootModel extends Models<RootModel> {
  game: typeof gameModel
  search: typeof searchModel
  discovery: typeof discoveryModel
}

export const models: RootModel = {
  game: gameModel,
  search: searchModel,
  discovery: discoveryModel,
}
