import { intArg, mutationField, nonNull, objectType } from "nexus"
import { GraphqlAuth } from "@/lib/auth"
import { Role } from "@/lib/permissions"

export const Appearance = objectType({
  name: "Appearance",
  definition(t) {
    t.model
      .id()
      .person()
      .tags()
      .addedBy()
      .faces()
      .image()
      .createdAt()
      .updatedAt()
  },
})

export const Mutation = mutationField((t) => {
  t.nonNull.int("unlinkFace", {
    description:
      "Unlinks an existing face from an appearance. This dissociates the face from the appearance but does not remove the face data",
    args: {
      faceId: nonNull(intArg()),
      appearanceId: nonNull(intArg()),
    },
    async resolve(_, args, { prisma }) {
      await prisma.face.update({
        where: { id: args.faceId },
        data: {
          appearanceId: null,
        },
        include: {
          appearance: true,
        },
      })
      return 1
    },
  })
  t.field("linkFace", {
    type: nonNull("Appearance"),
    description: "Attach an existing face to an apperance.",
    args: {
      faceId: nonNull(intArg()),
      appearanceId: nonNull(intArg()),
    },
    authorize: GraphqlAuth.hasRole([Role.Editor]),
    async resolve(_, args, { prisma }) {
      const face = await prisma.face.update({
        where: { id: args.faceId },
        data: {
          appearanceId: args.appearanceId,
        },
        include: {
          appearance: true,
        },
      })
      if (!face.appearance) {
        throw Error("No such appearance")
      }
      return face.appearance
    },
  })
  t.field("addAppearance", {
    type: nonNull("Appearance"),
    description: "Add an appearance relation on an media.",
    args: {
      personId: nonNull(intArg()),
      imageId: nonNull(intArg()),
    },
    resolve(_, args, { prisma, user }) {
      if (!user) {
        throw Error("User not logged in")
      }
      return prisma.appearance.create({
        data: {
          imageId: args.imageId,
          personId: args.personId,
          addedById: user.id,
        },
      })
    },
  })
  t.field("removeAppearance", {
    type: nonNull("Appearance"),
    description: "Removes an appearance from an media",
    args: {
      appearanceId: nonNull(intArg()),
    },
    async resolve(_, args, { prisma, user }) {
      if (!user) {
        throw Error("User not logged in")
      }
      const appearance = await prisma.appearance.delete({
        include: { faces: true },
        where: { id: args.appearanceId },
      })
      return appearance
    },
  })
})
