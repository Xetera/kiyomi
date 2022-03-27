import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";

@ObjectType("Role")
export class RoleModel {
  @Field()
  name!: string

  @Field(() => GraphQLISODateTime)
  createdAt!: Date
}