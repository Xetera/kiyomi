import { Field, ObjectType } from "@nestjs/graphql";
import { PersonModel } from "../../person/models/person.model";
import { TagModel } from "../../tag/models";
import { AppearanceModel } from "./appearance.model";

@ObjectType("AppearanceTag", {
  description: "A tag that describes a specific person in a media. For tags that describe media itself, see MediaTag.",
})
export class AppearanceTagModel {
  @Field(() => AppearanceModel)
  appearance!: AppearanceModel;

  @Field(() => TagModel)
  tag!: TagModel
}