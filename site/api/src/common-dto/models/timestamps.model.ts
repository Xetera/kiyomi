import { ObjectType, Field, GraphQLISODateTime } from "@nestjs/graphql"

@ObjectType()
export class TimestampsModel {
  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() =>  GraphQLISODateTime)
  updatedAt!: Date;
}