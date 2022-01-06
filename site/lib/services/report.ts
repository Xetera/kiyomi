import { PrismaClient, Prisma } from "@prisma/client"

export type ReportServiceOptions = {
  prisma: PrismaClient
}

export const makeReport = ({ prisma }: ReportServiceOptions) => {
  return {
    reportImage(data: Prisma.ImageReportCreateInput) {
      return prisma.imageReport.create({
        data,
      })
    },
  }
}

export type ReportService = ReturnType<typeof makeReport>
