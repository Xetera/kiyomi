import { Field, Int, ObjectType } from "@nestjs/graphql"
import { RoleModel } from "./role.model"

@ObjectType("User")
export class UserModel {
  @Field()
  id!: number

  @Field({ nullable: true })
  name!: string

  @Field({ nullable: true })
  avatarUrl!: string

  @Field(() => [RoleModel])
  roles!: RoleModel[]

  @Field({
    defaultValue: false,
    description: "Whether this user is a bot account",
  })
  bot!: boolean

  @Field(() => Int, {
    defaultValue: 0,
    description: "User's experience points",
  })
  xp!: number
}