import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType("MediaCoordinate", {
  description: "A coordinate relative to the dimensions of an image",
})
export class MediaCoordinateModel {
  @Field()
  x!: number

  @Field()
  y!: number
}
