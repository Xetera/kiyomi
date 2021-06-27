import { Models } from "@rematch/core"
import { gameModel } from "./game"

export interface RootModel extends Models<RootModel> {
  game: typeof gameModel
}

export const models: RootModel = { game: gameModel }
