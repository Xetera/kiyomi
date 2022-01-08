import { enumType, mutationField, nonNull, objectType, queryField } from "nexus"
import { GraphqlAuth } from "@/lib/auth"
import { Role } from "@/lib/permissions"

export const ImageReport = objectType({
  name: "ImageReport",
  definition(t) {
    t.model
      .id()
      .image()
      .reason()
      .reportedBy()
      .actionedAt()
      .action()
      .createdAt()
      .updatedAt()
  },
})

export const ImageReportActionKind = enumType({
  name: "ImageReportAction",
  members: [
    {
      name: "DISMISS",
    },
    {
      name: "DELETE_IMAGE",
    },
    {
      name: "HIDE_IMAGE",
    },
    {
      name: "RESTRICT_USER",
    },
    {
      name: "OTHER",
    },
  ],
})

export const Mutation = mutationField((t) => {
  t.field("imageReportAction", {
    type: ImageReport,
    description:
      "Action on an image reported by a user. Only usable by moderators",
    args: {
      reportId: nonNull("Int"),
      action: nonNull(ImageReportActionKind),
    },
    authorize: GraphqlAuth.hasRole([Role.Moderator]),
    resolve(t, args, { user, prisma, report }) {
      if (!user) {
        throw Error("Unauthorized")
      }
      return report.actionImageReport({
        moderatorId: user.id,
        actionKind: args.action,
        reportId: args.reportId,
      })
    },
  })
  t.field("reportImage", {
    type: ImageReport,
    args: {
      imageId: nonNull("Int"),
      reason: "String",
    },
    authorize: GraphqlAuth.isLoggedIn,
    async resolve(t, args, { user, prisma, report }) {
      if (!user) {
        throw Error("Unauthorized")
      }
      const hasRestriction = Boolean(
        await prisma.userRestriction.findUnique({
          where: {
            userRestrictionTarget: {
              userId: user.id,
              restriction: "NO_IMAGE_REPORT",
            },
          },
        })
      )
      if (hasRestriction) {
        throw Error("A moderator has removed your image reporting permissions")
      }
      return await report.reportImage({
        reason: args.reason ?? undefined,
        image: {
          connect: {
            id: args.imageId,
          },
        },
        reportedBy: {
          connect: {
            id: user.id,
          },
        },
      })
    },
  })
})

export const Query = queryField((t) => {
  t.crud.imageReports({ filtering: true, ordering: true, pagination: true })
})
