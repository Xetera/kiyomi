import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";
import { TagModel } from "./tag.model";

@ObjectType("AppearanceTag")
export class AppearanceTagModel {
  @Field(() => TagModel)
  tag: TagModel;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}