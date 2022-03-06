import { Field, GraphQLISODateTime, Int, ObjectType } from "@nestjs/graphql"
import { MediaModel } from "../../media/models"
import { UserModel } from "../../user/models/user.model"
import { AppearanceModel } from "../../appearance/models/appearance.model"
import { FaceSource } from "@prisma/client";

@ObjectType("Face")
export class FaceModel {
  @Field(() => Int)
  id!: number

  @Field({
    description:
      "The x coordinate of the top left corner of the face in pixels. The origin is the top left corner of the image.",
  })
  x!: string

  @Field({
    description:
      "The y coordinate of the top left corner of the face in pixels. The origin is the top left corner of the image.",
  })
  y!: string

  @Field({
    description: "Width of the face in pixels.",
  })
  width!: string

  @Field({
    description: "Height of the face in pixels.",
  })
  height!: string

  @Field(() => UserModel, {
    description:
      "The person who added this face on the appearance. Null if the user was deleted.",
    nullable: true,
  })
  addedBy?: MediaModel

  @Field(() => AppearanceModel, {
    description: "The appearance this face belongs to.",
    nullable: true,
  })
  appearance?: AppearanceModel

  @Field(() => MediaModel, {
    description: "The media this face appears in, either as a part of a known person's appearance, or an unknown face.",
  })
  media!: MediaModel

  @Field(() => FaceSource, {
    description: "The method that was used to add this face.",
  })
  source!: FaceSource

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() =>  GraphQLISODateTime)
  updatedAt!: Date;
}
