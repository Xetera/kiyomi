import { Field, GraphQLISODateTime, Int, ObjectType } from "@nestjs/graphql";
import { AliasModel } from "../../alias/models/alias.model"
import { MediaModel } from "../../media/models";

@ObjectType("Group")
export class GroupModel {
  @Field(() => Int)
  id!: number

  @Field()
  name!: string

  @Field(() => MediaModel, { nullable: true })
  avatarUrl?: MediaModel

  @Field(() => MediaModel, { nullable: true })
  banner?: MediaModel

  @Field(() => [AliasModel])
  aliases!: AliasModel[]

  // @Field(() => AliasModel, {
  //   nullable: true,
  //   description: "The aliases of the person commonly goes by",
  // })
  // preferredAlias!: AliasModel[]

  // @Field(() => [GroupMemberModel], )
  // memberOf!: GroupMemberModel[]

  // @Field(() => GroupMemberModel, {
  //   nullable: true,
  //   description: "The primary group member the person represents"
  // })
  // preferredMembership!: GroupMemberModel[]

  @Field(() => GraphQLISODateTime)
  birthDate?: Date

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}
