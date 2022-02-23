import { registerEnumType } from "@nestjs/graphql"
import { UploadType } from "@prisma/client"

registerEnumType(UploadType, {
  name: "UploadType",
  description: "The way an upload took place.",
  valuesMap: {
    AUTO_DISCOVERY: {
      description: "An item discovered by an automatic content scanner",
    },
    TOKEN: {
      description: "An item added automatically through a token"
    },
    WEBSITE: {
       description: "An item uploaded manually by a user"
    }
  },
})