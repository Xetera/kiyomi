import {
  Field,
  Float,
  GraphQLISODateTime,
  ID,
  Int,
  ObjectType,
} from "@nestjs/graphql"
import { MimeType, UploadDestination, UploadType } from "@prisma/client"
import { MediaTagModel } from "./media-tag.model"
import { UserModel } from "../../user/models/user.model"
import { AppearanceModel } from "../../appearance/models/appearance.model"
import { MediaCoordinateModel } from "./media-coordinate.model"

@ObjectType("Media", {
  description: "An image or a video.",
})
export class MediaModel {
  @Field(() => Int)
  id!: number

  @Field(() => Int, {
    description: "Width of the media in pixels.",
  })
  width!: number

  @Field(() => Int, {
    description: "Height of the media in pixels.",
  })
  height!: number

  @Field(() => UploadType)
  uploadType!: UploadType

  @Field({ description: "SHA-256 hash of the media" })
  hash!: string

  @Field({
    nullable: true,
    description:
      "The name of the file when it was uploaded. Only valid for uploadType WEBSITE.",
  })
  fileName!: string

  @Field(() => [Int], {
    description:
      "The primary colors of the media in decimal format ordered by frequency. May not be present for animated formats like MP4s.",
  })
  palette!: number[]

  @Field({
    nullable: true,
    description: "The website or other relevant source this media is from.",
    deprecationReason: "Use the `sources` field instead.",
  })
  source!: string

  @Field(() => UserModel, { nullable: true })
  uploadedBy!: UserModel

  @Field(() => [MediaTagModel], {
    description: "The tags describing with this media.",
  })
  tags!: MediaTagModel[]

  @Field(() => UploadDestination, {
    nullable: true,
    description: "The location where this media is stored.",
  })
  destination!: UploadDestination

  @Field(() => ID, {
    description: "A randomly generated ID for the media.",
  })
  slug!: string

  @Field({
    description:
      "Whether this media is available for everyone to view. Only visible to the uploader and moderators if false.",
  })
  public!: number

  @Field({ nullable: true, description: "Media description." })
  caption!: string

  @Field(() => Int, {
    description: "The number of times a user has visited the media page.",
  })
  views!: number

  @Field((type) => MimeType, {
    description: "The file extension of the media.",
  })
  mimetype!: MimeType

  @Field(() => Int, {
    description: "Size of the uploaded file in bytes.",
  })
  bytes!: number

  @Field(() => [AppearanceModel], {
    description: "The people who appear in this media.",
  })
  appearances!: AppearanceModel[]

  @Field(() => GraphQLISODateTime, {
    nullable: true,
    description:
      "The last date this media was scanned for faces. Usually represents the date it was uploaded unless manually re-scanned.",
  })
  faceScanDate?: Date

  @Field(() => Int, {
    nullable: true,
    description: "The ID of the media if taken from irenebot.",
  })
  ireneBotId?: number

  @Field(() => GraphQLISODateTime, {
    nullable: true,
    description:
      "The date the image was last hidden. Null if not hidden or unhidden.",
  })
  hiddenAt?: Date

  // @Field(() => GraphQLISODateTime)
  // thumbnail: Thumbnail!

  @Field({
    nullable: true,
    description: "Human readable file size.",
    deprecationReason: "Use `bytes` instead.",
  })
  fileSize?: string

  @Field({
    description:
      "The source url of the full-size media. Use `thumbnail` for resized copies.",
  })
  url!: string

  @Field(() => Float, {
    description: "width / height + didn't ask + you fell off +",
  })
  aspectRatio!: number

  @Field({
    description:
      "Whether the current user has liked this media. Null if not logged in.",
    nullable: true,
  })
  liked?: boolean

  @Field({
    description:
      "The coordinate of an image that should be focused on when zooming in",
  })
  focus!: MediaCoordinateModel
  // unknownFaces: [Face!]!
  // connections(...): ImageConnections!
  @Field(() => Boolean, {
    defaultValue: false,
    description:
      "Whether the current user has reported the media. Null if not logged in.",
  })
  reported!: boolean

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}
