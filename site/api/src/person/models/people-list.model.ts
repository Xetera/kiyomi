import { Field, ObjectType } from "@nestjs/graphql"
import { PersonModel } from "./person.model"
import { Person } from "@prisma/client"

@ObjectType("PeopleList")
export class PeopleListModel {
  @Field(() => String, { nullable: true })
  cursor?: string

  @Field(() => [PersonModel])
  people!: Person[]
}
