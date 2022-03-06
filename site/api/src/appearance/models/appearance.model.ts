import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql"
import { PersonModel } from "../../person/models/person.model"
import { AppearanceTagModel } from "./appearance-tag.model"
import { UserModel } from "../../user/models/user.model"
import { MediaModel } from "../../media/models"

@ObjectType("Appearance", {
  description: "The presence of a person in a media.",
})
export class AppearanceModel {
  @Field(() => PersonModel)
  person!: PersonModel

  @Field(() => [AppearanceTagModel])
  tags!: AppearanceTagModel[]

  @Field(() => MediaModel)
  media!: MediaModel

  @Field(() => UserModel, {
    nullable: true,
  })
  addedBy!: UserModel

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}