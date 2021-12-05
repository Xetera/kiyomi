import { enumType, mutationField, nonNull, objectType, queryField } from "nexus"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime"
import { PrismaError } from "prisma-error-enum"
import { GraphQLError } from "graphql"
import { GraphqlAuth } from "../auth"
import { imgproxy } from "../imgproxy"
import { DiscoveryVerdictKind } from "./discovered-image-verdict"

export const DiscoveredImage = objectType({
  name: "DiscoveredImage",
  definition(t) {
    t.model
      .id()
      .duplicateImage()
      .votes({
        pagination: true,
        description: "Votes cast by all users",
        filtering: true,
      })
      .referenceUrl()
      .uniqueIdentifier()
      .duplicateImage()
      .verdict()
      .url()
      .image({ alias: "approvedImage" })
      .providerType()
      .createdAt()
      .updatedAt()
    t.field("vote", {
      type: "DiscoveredImageVote",
      description: "The vote cast by the currently logged in user",
      resolve(root, __, { user, prisma }) {
        if (!user) {
          return null
        }
        return prisma.discoveredImageVote.findUnique({
          where: {
            userVote: {
              userId: user.id,
              discoveredImageId: root.id,
            },
          },
        })
      },
    })
    t.field("thumbnail", {
      type: nonNull("String"),
      description: "A smaller thumbnail of the image",
      resolve(root, _, {}) {
        const base = imgproxy
          .image(root.url)
          .width(0)
          .resizeType("fill")
          .extension("webp")
        return base.height(500).get()
      },
    })
  },
})

export const Query = queryField((t) => {
  t.crud.discoveredImages({ pagination: true, ordering: true, filtering: true })
})

export const Mutation = mutationField((t) => {
  t.field("discoveredImageVote", {
    type: nonNull("DiscoveredImageVote"),
    description: "Cast a vote on a single discovered image",
    args: {
      imageId: nonNull("Int"),
      verdict: nonNull(DiscoveryVerdictKind),
      reason: "String",
    },
    authorize: GraphqlAuth.isLoggedIn,
    async resolve(root, args, { user, discovery }) {
      try {
        return await discovery.voteImage({
          imageId: args.imageId,
          verdict: args.verdict,
          reason: args.reason ?? undefined,
          userId: user!.id,
        })
      } catch (err) {
        if (
          err instanceof PrismaClientKnownRequestError &&
          err.code === PrismaError.UniqueConstraintViolation
        ) {
          throw new GraphQLError("Already voted on that image")
        }
        throw err
      }
    },
  })
})
