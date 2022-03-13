import { Field, GraphQLISODateTime, Int, ObjectType } from "@nestjs/graphql"
import { GroupModel } from "../../group/models/group.model"
import { PersonModel } from "../../person/models/person.model"

@ObjectType("GroupMember")
export class GroupMemberModel  {
  @Field(() => Int)
  id!: number

  @Field(() => GroupModel)
  group!: GroupModel

  @Field(() => PersonModel)
  person!: PersonModel

  @Field(() => GraphQLISODateTime, { nullable: true })
  startDate?: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  endDate?: Date

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}
