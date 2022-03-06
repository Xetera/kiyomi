import { Field, GraphQLISODateTime, Int, ObjectType } from "@nestjs/graphql"
import { AliasModel } from "../../alias/models/alias.model"
import { AppearanceModel } from "../../appearance/models/appearance.model"
import { GroupMemberModel } from "../../group-member/models/group-member.model"

@ObjectType("Person")
export class PersonModel {
  @Field(() => Int)
  id!: number

  @Field(() => [AliasModel])
  aliases!: AliasModel[]

  @Field(() => [AppearanceModel], {
    description: "The media-appearances of this person.",
  })
  appearances!: AppearanceModel[]

  @Field(() => AliasModel, {
    nullable: true,
    description: "The aliases of the person commonly goes by",
  })
  preferredAlias!: AliasModel[]

  @Field(() => [GroupMemberModel], {
    description: "The groups that this person is a member of",
  })
  groupMembers!: GroupMemberModel[]

  // @Field(() => GroupMemberModel, {
  //   nullable: true,
  //   description: "The primary group member the person represents"
  // })
  // preferredMembership!: GroupMemberModel[]

  @Field({ nullable: true })
  name?: string

  @Field(() => GraphQLISODateTime, { nullable: true })
  birthDate?: Date

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}