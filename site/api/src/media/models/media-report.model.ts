import { Field, GraphQLISODateTime, Int, ObjectType } from "@nestjs/graphql"
import { TagModel } from "../../tag/models";
import { MediaModel } from "./media.model";
import { UserModel } from "../../user/models/user.model";
import { ImageReportAction } from "@prisma/client";

@ObjectType("MediaReport", {
  description: "A reported media item",
})
export class MediaReportModel {
  @Field(() => Int)
  id!: number
  
  @Field(() => TagModel, { nullable: true })
  tag!: TagModel

  @Field(() => MediaModel)
  media!: MediaModel

  @Field({ nullable: true })
  reason?: string

  @Field(() => ImageReportAction, { nullable: true })
  action?: ImageReportAction

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
