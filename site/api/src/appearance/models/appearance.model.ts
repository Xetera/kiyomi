import { Field, ObjectType } from "@nestjs/graphql"
import { PersonModel } from "../../person/models/person.model"
import { AppearanceTagModel } from "./appearance-tag.model"
import { UserModel } from "../../user/models/user.model";

@ObjectType("Appearance", {
  description: "The presence of a person in a media.",
})
export class AppearanceModel {
  @Field(() => PersonModel)
  person!: PersonModel

  @Field(() => [AppearanceTagModel])
  tags!: AppearanceTagModel[]

  @Field(() => UserModel, {
    nullable: true,
  })
  addedBy!: UserModel
}