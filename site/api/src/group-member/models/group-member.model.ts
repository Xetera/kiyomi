import { Field, GraphQLISODateTime, Int, ObjectType } from "@nestjs/graphql"
import { GroupModel } from "../../group/models/group.model"
import { PersonModel } from "../../person/models/person.model"
import { TimestampsModel } from "../../common-dto/models/timestamps.model";

@ObjectType("GroupMember")
export class GroupMemberModel extends TimestampsModel {
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
}
