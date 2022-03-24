import { Field, Int, ObjectType } from "@nestjs/graphql"

@ObjectType("MediaCoordinate")
export class MediaCoordinateModel {
  @Field(() => Int)
  x!: number

  @Field(() => Int)
  y!: number
}
