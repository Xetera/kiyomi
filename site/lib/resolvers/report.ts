import { mutationField, nonNull, objectType } from "nexus"
import { GraphqlAuth } from "@/lib/auth"

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

export const Mutation = mutationField((t) => {
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
        throw Error("You are not allowed to report images")
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
