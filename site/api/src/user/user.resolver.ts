import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql"
import { UserModel } from "./models/user.model"
import { UserService } from "./user.service"
import { RoleModel } from "./models/role.model"
import { MediaModel } from "../media/models"

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private userService: UserService) {}

  @ResolveField(() => [RoleModel])
  async roles(@Parent() user: UserModel) {
    return this.userService.roles(user.id)
  }

  @Query(() => UserModel, {
    nullable: true,
    description: "Get the current logged in user. Null if not logged in.",
  })
  async me() {
    // TODO: implement
    return null
  }
}
