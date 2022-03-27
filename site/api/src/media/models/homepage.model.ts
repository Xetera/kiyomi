import { Field, ObjectType } from "@nestjs/graphql"
import { MediaModel } from "./media.model"
import { Image } from "@prisma/client"

@ObjectType("Homepage")
export class HomepageModel {
  @Field({ nullable: true })
  cursor?: string

  @Field(() => [MediaModel])
  media!: Image[]
}
