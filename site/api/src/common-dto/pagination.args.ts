import { ArgsType, Field, Int } from "@nestjs/graphql"

@ArgsType()
export class PaginationArgs {
  static DEFAULT_PAGE_SIZE = 10
  @Field(() => Int, {
    nullable: true,
    description: "Amount of items to view per page",
    defaultValue: PaginationArgs.DEFAULT_PAGE_SIZE,
  })
  take!: number

  @Field(() => Int, {
    nullable: true,
    description: "Amount of previously-seen items to skip",
    defaultValue: 0,
  })
  skip!: number
}