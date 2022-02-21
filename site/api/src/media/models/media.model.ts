import { Field, GraphQLISODateTime, ID, Int, ObjectType } from "@nestjs/graphql"
import { MimeType, UploadDestination, UploadType } from "@prisma/client"
import { MediaTagModel } from "./media-tag.model"
import { UserModel } from "../../user/models/user.model"

@ObjectType("Media", {
  description: "An image or a video on the site",
})
export class MediaModel {
  @Field(() => Int)
  id!: number

  @Field(() => Int)
  width!: number

  @Field(() => Int)
  height!: number

  @Field(() => UploadType)
  uploadType!: UploadType

  @Field()
  hash!: string

  @Field({ nullable: true })
  fileName!: string

  @Field(() => [Int])
  palette!: number[]

  @Field({ nullable: true })
  source!: string

  @Field(() => UserModel, { nullable: true })
  uploadedBy!: UserModel

  @Field(() => [MediaTagModel], {
    description: "The tags associated with this media",
  })
  tags!: MediaTagModel[]

  @Field(() => UploadDestination, { nullable: true })
  destination!: UploadDestination

  @Field(() => ID, {
    description: "A randomly generated ID for the media",
  })
  slug!: string

  @Field()
  public!: number

  @Field({ nullable: true })
  caption!: string

  @Field(() => Int, {
    description: "The number of times a user has visited the media page",
  })
  views!: number

  @Field((type) => MimeType)
  mimetype!: MimeType

  @Field(() => Int)
  bytes!: number

  // @Field(() => [Appearance])
  // appearances: [Appearance!]!

  @Field(() => GraphQLISODateTime, { nullable: true })
  faceScanDate?: Date

  @Field(() => Int, { nullable: true })
  ireneBotId?: number

  @Field(() => GraphQLISODateTime, { nullable: true })
  hiddenAt?: Date

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  // @Field(() => GraphQLISODateTime)
  // thumbnail: Thumbnail!

  @Field({ nullable: true })
  fileSize?: string

  // @Field()
  // fileSize: string
  // url: String!
  // rawUrl: String!
  // aspectRatio: Float!
  // liked: Boolean
  // focus: ImageCoordinate!
  // unknownFaces: [Face!]!
  // connections(...): ImageConnections!
  @Field(() => Boolean, { nullable: true })
  reported!: boolean
}