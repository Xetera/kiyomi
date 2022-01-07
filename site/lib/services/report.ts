import { PrismaClient, Prisma } from "@prisma/client"
import { siteEvent } from "@/lib/observer"

export type ReportServiceOptions = {
  prisma: PrismaClient
}

export const makeReport = ({ prisma }: ReportServiceOptions) => {
  return {
    async reportImage(data: Prisma.ImageReportCreateInput) {
      const image = await prisma.imageReport.create({
        data,
      })
      siteEvent.image.report$.next(image)
      return image
    },
  }
}

export type ReportService = ReturnType<typeof makeReport>
