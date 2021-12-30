import { mutationField, nonNull, objectType } from "nexus"
import { GraphqlAuth } from "../auth"

export const Tag = objectType({
  name: "Tag",
  definition(t) {
    t.model
      .name()
      .aliases()
      .category()
      .addedBy()
      .source()
      .createdAt()
      .createdAt()
  },
})

export const ImageTag = objectType({
  name: "ImageTag",
  definition(t) {
    t.model.tag().image().addedBy().createdAt().updatedAt()
  },
})

export const AppearanceTag = objectType({
  name: "AppearanceTag",
  definition(t) {
    t.model.tag().appearance().addedBy().createdAt().updatedAt()
  },
})

export const TagCategory = objectType({
  name: "TagCategory",
  definition(t) {
    t.model.name().addedBy().createdAt().updatedAt()
  },
})

export const TagAlias = objectType({
  name: "TagAlias",
  definition(t) {
    t.model.name().tag().addedBy().createdAt().updatedAt()
  },
})

export const Mutation = mutationField((t) => {
  t.field("createAppearanceTag", {
    type: nonNull("AppearanceTag"),
    args: {
      name: nonNull("String"),
      appearanceId: nonNull("Int"),
    },
    resolve(_, args, { tag, user }) {
      if (!user) {
        throw Error("Unauthorized")
      }
      return tag.addAppearanceTag({
        user,
        tagName: args.name,
        appearanceId: args.appearanceId,
      })
    },
  })
  // TODO: better authorization
  t.field("deleteAppearanceTag", {
    type: "AppearanceTag",
    args: {
      name: nonNull("String"),
      appearanceId: nonNull("Int"),
    },
    resolve(t, args, { tag, user }) {
      if (!user) {
        throw Error("Unauthorized")
      }
      return tag.deleteAppearanceTag({
        tagName: args.name,
        appearanceId: args.appearanceId,
        user,
      })
    },
  })
  t.field("createImageTag", {
    type: nonNull("ImageTag"),
    args: {
      name: nonNull("String"),
      imageId: nonNull("Int"),
    },
    resolve(t, args, { tag, user }) {
      if (!user) {
        throw Error("Unauthorized")
      }
      return tag.addImageTag({
        tagName: args.name,
        imageId: args.imageId,
        user,
      })
    },
  })
  t.field("deleteImageTag", {
    type: "ImageTag",
    args: {
      name: nonNull("String"),
      imageId: nonNull("Int"),
    },
    resolve(t, args, { tag, user }) {
      if (!user) {
        throw Error("Unauthorized")
      }
      return tag.deleteImageTag({
        tagName: args.name,
        imageId: args.imageId,
        user,
      })
    },
  })

  t.field("createTag", {
    type: nonNull("Tag"),
    args: {
      name: nonNull("String"),
    },
    authorize: GraphqlAuth.isLoggedIn,
    async resolve(root, args, { tag, user, prisma }) {
      if (!user) {
        throw Error("Unauthorized")
      }
      const indexable = await tag.upsertTag({
        user,
        tagName: args.name,
      })
      return prisma.tag.findUnique({ where: { name: indexable.name } })
    },
  })
})
