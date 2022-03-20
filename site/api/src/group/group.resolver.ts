import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql"
import { MediaModel } from "../media/models"
import { Group, GroupAlias, GroupMember, Image } from "@prisma/client"
import { GroupModel } from "./models/group.model"
import { GroupService } from "./group.service"
import { GroupMemberModel } from "../group-member/models/group-member.model"
import { AliasModel } from "../alias/models/alias.model"
import { GroupStatusModel } from "./models/group-status.model";

@Resolver(() => GroupModel)
export class GroupResolver {
  constructor(private readonly groupService: GroupService) {}

  @Query(() => GroupModel, { nullable: true })
  group(@Args("id", { type: () => Int }) id: number): Promise<Group | null> {
    return this.groupService.findById(id)
  }

  @ResolveField(() => MediaModel, { nullable: true })
  avatar(@Parent() group: Group): Promise<Image | null> {
    return this.groupService.avatar(group.id)
  }

  @ResolveField(() => MediaModel, { nullable: true })
  banner(@Parent() group: Group): Promise<Image | null> {
    return this.groupService.banner(group.id)
  }

  @ResolveField(() => [AliasModel])
  aliases(@Parent() group: Group): Promise<GroupAlias[]> {
    return this.groupService.aliases(group.id)
  }

  @ResolveField(() => [GroupMemberModel])
  members(@Parent() group: Group): Promise<GroupMember[]> {
    return this.groupService.groupMembers(group.id)
  }

  @ResolveField(() => GroupStatusModel)
  async status(@Parent() group: Group) {

  }
}
