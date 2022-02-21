import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { UserModel } from "./models/user.model";
import { UserService } from "./user.service"
import { RoleModel } from "./models/role.model";

@Resolver(() => UserModel)
export class UserResolver {
  constructor(
    private userService: UserService
  ) {}

  @ResolveField(() => [RoleModel])
  async roles(@Parent() user: UserModel) {
    return this.userService.roles(user.id);
  }
}
