import { Field, GraphQLISODateTime, Int, ObjectType } from "@nestjs/graphql";
import { TimestampsModel } from "../../common-dto/models/timestamps.model";

@ObjectType("Alias")
export class AliasModel extends TimestampsModel {
  @Field(() => Int)
  id!: number

  @Field()
  name!: string
}
