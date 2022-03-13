import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql"
import { PersonModel } from "./models/person.model"
import { AliasModel } from "../alias/models/alias.model"
import { Alias, Appearance, GroupMember, Person } from "@prisma/client"
import { PersonService } from "./person.service"
import { AppearanceModel } from "../appearance/models/appearance.model"
import { GroupMemberModel } from "../group-member/models/group-member.model"
import { GroupMemberService } from "../group-member/group-member.service";

@Resolver(() => PersonModel)
export class PersonResolver {
  constructor(private personService: PersonService,
    private groupMemberService: GroupMemberService,
  ) {
  }

  @Query(() => PersonModel, { nullable: true })
  person(@Args("id") id: number): Promise<Person | null> {
    return this.personService.findById(id)
  }

  @ResolveField(() => [AliasModel], {
    description: "Alternative names this person is known by.",
  })
  aliases(@Parent() person: Person): Promise<Alias[]> {
    return this.personService.aliases(person.id)
  }

  @ResolveField(() => AliasModel)
  async preferredAlias(@Parent() person: Person): Promise<Alias | null> {
    if (!person.preferredAliasId) {
      return null
    }
    return this.personService.preferredAlias(person.preferredAliasId)
  }

  @ResolveField(() => [AppearanceModel])
  appearances(@Parent() person: Person): Promise<Appearance[]> {
    return this.personService.appearances(person.id)
  }

  @ResolveField(() => [GroupMemberModel])
  groupMembers(@Parent() person: Person): Promise<GroupMember[]> {
    return this.personService.groupMembers(person.id)
  }

  @ResolveField(() => GroupMemberModel, { nullable: true})
  async preferredGroupMember(@Parent() person: Person): Promise<GroupMember | null> {
    if (!person.preferredMembershipId) {
      return null
    }
    return this.groupMemberService.findById(person.preferredMembershipId)
  }
}
