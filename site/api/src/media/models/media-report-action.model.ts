import { registerEnumType } from "@nestjs/graphql";
import { ImageReportAction } from "@prisma/client"

registerEnumType(ImageReportAction, {
  name: "MediaReportAction",
  description: undefined,
})