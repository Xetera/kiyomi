import { registerEnumType } from "@nestjs/graphql"
import { UploadType } from "@prisma/client"

registerEnumType(UploadType, {
  name: "UploadType",
})