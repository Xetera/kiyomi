import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";

@ObjectType("TagCategory")
export class TagCategoryModel {
  @Field()
  name: string

  // @Field(() => User, { nullable: true })
  // addedBy: User

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}

