import { Field, GraphQLISODateTime, Int, ObjectType } from "@nestjs/graphql";

@ObjectType("Alias")
export class AliasModel {
  @Field(() => Int)
  id!: number

  @Field()
  name!: string

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() =>  GraphQLISODateTime)
  updatedAt!: Date;
}
