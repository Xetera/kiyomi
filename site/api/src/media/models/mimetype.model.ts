import { registerEnumType } from "@nestjs/graphql"
import { MimeType } from "@prisma/client"

registerEnumType(MimeType, {
  name: "MimeType",
})