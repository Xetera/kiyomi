import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";
import { TagModel } from "../../tag/models";
import { MediaModel } from "./media.model";
import { UserModel } from "../../user/models/user.model";

@ObjectType("MediaReport", {
  description: "A reported media item",
})
export class MediaReportModel {
  @Field(() => TagModel, { nullable: true })
  tag!: TagModel

  @Field(() => MediaModel)
  media!: MediaModel

  @Field(() => UserModel, {
    nullable: true,
    description: "The user who added the tag. Null if the user was deleted.",
  })
  addedBy?: UserModel

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}
