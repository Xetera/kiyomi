import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql"
import { PersonModel } from "./models/person.model"
import { AliasModel } from "../alias/models/alias.model"
import { Person, Alias } from "@prisma/client"
import { PersonService } from "./person.service"

@Resolver(() => PersonModel)
export class PersonResolver {
  constructor(private personService: PersonService) {
  }

  @Query(() => PersonModel, { nullable: true})
  person(@Args("id") id: number): Promise<Person | null> {
    return this.personService.findById(id)
  }

  @ResolveField(() => [AliasModel])
  aliases(@Parent() person: Person): Promise<Alias[]> {
    return this.personService.aliases(person.id)
  }
}
