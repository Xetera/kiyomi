import { Field, ObjectType } from "@nestjs/graphql"
import { PersonModel } from "../../person/models/person.model"
import { AppearanceTagModel } from "./appearance-tag.model"
import { UserModel } from "../../user/models/user.model";
import { TimestampsModel } from "../../common-dto/models/timestamps.model";
import { MediaModel } from "../../media/models";

@ObjectType("Appearance", {
  description: "The presence of a person in a media.",
})
export class AppearanceModel extends TimestampsModel {
  @Field()
  id!: number

  @Field(() => PersonModel)
  person!: PersonModel

  @Field(() => [AppearanceTagModel])
  tags!: AppearanceTagModel[]

  @Field(() => UserModel, {
    nullable: true,
  })
  addedBy!: UserModel

  @Field(() => MediaModel)
  media!: MediaModel
  // @Field(() => MediaModel)
  // faces!: FaceM
}