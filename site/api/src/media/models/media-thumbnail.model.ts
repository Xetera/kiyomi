import { Field, ObjectType } from "@nestjs/graphql";

export const MediaThumbnailModelWidths = {
  xsmall: 250,
  small: 350,
  medium: 500,
  large: 900,
  xlarge: 1200,
  full: 1920,
} as const

@ObjectType()
export class MediaThumbnailModel {
  @Field({
    description: "",
  })
  xsmall!: string;

}