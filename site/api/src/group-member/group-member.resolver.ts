import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql"
import { Group, GroupMember, Person } from "@prisma/client"
import { GroupMemberModel } from "../group-member/models/group-member.model"
import { GroupMemberService } from "./group-member.service"
import { PersonService } from "../person/person.service"
import { GroupService } from "../group/group.service"
import { GroupModel } from "../group/models/group.model"

@Resolver(() => GroupMemberModel)
export class GroupMemberResolver {
  constructor(
    private readonly groupMemberService: GroupMemberService,
    private readonly groupService: GroupService,
    private readonly personService: PersonService,
  ) {}

  @Query(() => GroupMemberModel, { nullable: true })
  groupMember(
    @Args("id", { type: () => Int }) id: number,
  ): Promise<GroupMember | null> {
    return this.groupMemberService.findById(id)
  }

  @ResolveField(() => GroupModel, { nullable: true })
  group(@Parent() groupMember: GroupMember): Promise<Group | null> {
    return this.groupService.findById(groupMember.groupId)
  }

  @ResolveField(() => GroupModel, { nullable: true })
  person(@Parent() groupMember: GroupMember): Promise<Person | null> {
    return this.personService.findById(groupMember.personId)
  }
}
