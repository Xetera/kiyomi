import { registerEnumType } from "@nestjs/graphql"

export enum GroupStatusModel {
  PRE_DEBUT = "PRE_DEBUT",
  ACTIVE = "ACTIVE",
  HIATUS = "HIATUS",
  DISBANDED = "DISBANDED",
}

registerEnumType(GroupStatusModel, {
  name: "GroupStatus",
})
