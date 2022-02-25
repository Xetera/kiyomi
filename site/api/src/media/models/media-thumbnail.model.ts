import { Field, ObjectType } from "@nestjs/graphql"

export const MediaThumbnailModelWidths = {
  xsmall: 200,
  small: 350,
  medium: 500,
  large: 900,
  xlarge: 1200,
  full: 1920,
} as const

@ObjectType("MediaThumbnail")
export class MediaThumbnailModel {
  @Field({
    description: `A thumbnail of a fullsize image at ${MediaThumbnailModelWidths.xsmall}px width.`,
  })
  xsmall!: string

  @Field({
    description: `A thumbnail of a fullsize image at ${MediaThumbnailModelWidths.small}px width.`,
  })
  small!: string

  @Field({
    description: `A thumbnail of a fullsize image at ${MediaThumbnailModelWidths.medium}px width.`,
  })
  medium!: string

  @Field({
    description: `A thumbnail of a fullsize image at ${MediaThumbnailModelWidths.large}px width.`,
  })
  large!: string

  @Field({
    description: `A thumbnail of a fullsize image at ${MediaThumbnailModelWidths.xlarge}px width.`,
  })
  full!: string
}
