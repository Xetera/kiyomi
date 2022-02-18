import { Models } from "@rematch/core"
import { gameModel } from "./game"
import { searchModel } from "./search"
import { discoveryModel } from "./discovery"
import { userModel } from "~/models/state/user"

export interface RootModel extends Models<RootModel> {
  game: typeof gameModel
  search: typeof searchModel
  discovery: typeof discoveryModel
  user: typeof userModel
}

export const models: RootModel = {
  game: gameModel,
  search: searchModel,
  discovery: discoveryModel,
  user: userModel,
}
