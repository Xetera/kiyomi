import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";
import { TagAliasModel } from "./tag-alias.model";

@ObjectType("Tag")
export class TagModel {
  @Field()
  name!: string

  @Field(() => TagAliasModel)
  aliases!: TagAliasModel[]

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}