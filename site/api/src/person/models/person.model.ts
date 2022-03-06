import { Field, GraphQLISODateTime, Int, ObjectType } from "@nestjs/graphql";
import { AliasModel } from "../../alias/models/alias.model"
import { AppearanceModel } from "../../appearance/models/appearance.model";

@ObjectType("Person")
export class PersonModel {
  @Field(() => Int)
  id!: number

  @Field(() => [AliasModel])
  aliases!: AliasModel[]

  @Field(() => [AppearanceModel])
  appearances!: AppearanceModel[]

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

  @Field({ nullable: true })
  name?: string

  @Field(() => GraphQLISODateTime, { nullable: true })
  birthDate?: Date

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}