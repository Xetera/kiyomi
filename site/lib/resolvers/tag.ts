import { objectType } from "nexus"

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
