import { ImageReportAction, Prisma, PrismaClient } from "@prisma/client"
import { siteEvent } from "@/lib/observer"
import { BanService } from "./ban"

export type ReportServiceOptions = {
  prisma: PrismaClient
  ban: BanService
}

export const makeReport = ({ prisma, ban }: ReportServiceOptions) => {
  return {
    async actionImageReport(data: ImageReportActionOptions) {
      const report = await prisma.imageReport.findUnique({
        where: { id: data.reportId },
      })
      if (!report) {
        throw Error("Invalid reportId")
      }
      const actionImage = (action: ImageReportAction) => {
        return prisma.imageReport.update({
          where: { id: data.reportId },
          data: {
            actionedById: data.moderatorId,
            actionedAt: new Date(),
            action,
          },
        })
      }
      const actions: Record<ImageReportAction, () => void> = {
        async [ImageReportAction.HIDE_IMAGE]() {
          await prisma.$transaction([
            prisma.image.update({
              where: { id: report.imageId },
              data: {
                hiddenAt: new Date(),
              },
            }),
            actionImage(ImageReportAction.HIDE_IMAGE),
          ])
        },
        [ImageReportAction.DELETE_IMAGE]() {
          throw new Error("Image deletion is not implemented")
        },
        async [ImageReportAction.RESTRICT_USER]() {
          actionImage(ImageReportAction.RESTRICT_USER)
          await ban
            .restrictUser({
              userId: report.reportedById,
              restriction: "NO_IMAGE_REPORT",
              associatedEntity: report.imageId,
              moderatorId: data.moderatorId,
            })
            .catch(console.error)
        },
        [ImageReportAction.DISMISS]() {
          return actionImage(ImageReportAction.DISMISS)
        },
        [ImageReportAction.OTHER]() {
          throw new Error("'OTHER' report is not implemented")
        },
      }
      await actions[data.actionKind]()
      return report
    },
    async reportImage(data: Prisma.ImageReportCreateInput) {
      const image = await prisma.imageReport.create({
        data,
      })
      siteEvent.image.report$.next(image)
      return image
    },
    async pendingReportCount() {
      return prisma.imageReport.count({
        where: {
          action: null,
        },
      })
    },
  }
}

export type ImageReportActionOptions = {
  reportId: number
  actionKind: ImageReportAction
  moderatorId?: number
}

export type ReportService = ReturnType<typeof makeReport>
