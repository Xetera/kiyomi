import { registerEnumType } from "@nestjs/graphql"
import { UploadDestination } from "@prisma/client"

registerEnumType(UploadDestination, {
  name: "UploadDestination",
})