import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";
import { TagModel } from "../../tag/models";
import { MediaModel } from "./media.model";

@ObjectType("MediaTag")
export class MediaTagModel {
  @Field(() => TagModel, { nullable: true })
  tag!: TagModel

  @Field(() => MediaModel)
  media!: MediaModel

  // @Field(() => User, { nullable: true })
  // addedBy: User

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}