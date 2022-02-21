import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class MediaThumbnailModel {
  @Field({
    description: "",
  })
  xsmall!: string;
}