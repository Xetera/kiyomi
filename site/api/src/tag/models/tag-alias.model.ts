import { ObjectType, Field, GraphQLISODateTime } from "@nestjs/graphql";
import { TagModel } from "./tag.model";

@ObjectType("TagAlias")
export class TagAliasModel {
  @Field()
  name: string

  @Field(() => TagModel)
  tag: TagModel

  // @Field(() => User, { nullable: true })
  // user: User

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}