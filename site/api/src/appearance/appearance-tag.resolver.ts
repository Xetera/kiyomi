import { Parent, ResolveField, Resolver } from "@nestjs/graphql"
import { Appearance, AppearanceTag } from "@prisma/client"
import { AppearanceService } from "./appearance.service"
import { AppearanceTagModel } from "./models/appearance-tag.model"
import { UserService } from "../user/user.service"
import { UserModel } from "../user/models/user.model"
import { AppearanceModel } from "./models/appearance.model";

@Resolver(() => AppearanceTagModel)
export class AppearanceTagResolver {
  constructor(
    private readonly appearanceService: AppearanceService,
    private readonly userService: UserService,
  ) {}

  @ResolveField(() => [AppearanceTagModel])
  tags(@Parent() appearance: Appearance): Promise<AppearanceTag[]> {
    return this.appearanceService.appearanceTags(appearance.id)
  }

  @ResolveField(() => AppearanceModel)
  async appearance(@Parent() appearanceTag: AppearanceTag): Promise<Appearance> {
    const appearance = await this.appearanceService.appearanceTagAppearance(appearanceTag.id)
    if (!appearance) {
      throw Error("No appearance")
    }
    return appearance
  }

  @ResolveField(() => UserModel)
  async addedBy(@Parent() appearance: Appearance) {
    if (!appearance.addedById) {
      return
    }
    return this.userService.getById(appearance.addedById)
  }
}
