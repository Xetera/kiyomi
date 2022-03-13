import { registerEnumType } from "@nestjs/graphql"
import { FaceSource } from "@prisma/client"

registerEnumType(FaceSource, {
  name: "FaceSource",
})