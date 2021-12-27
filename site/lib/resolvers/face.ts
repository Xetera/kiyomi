import {
  objectType,
  queryField,
  intArg,
  mutationField,
  nonNull,
  extendType,
} from "nexus"

export const Face = objectType({
  name: "Face",
  definition(t) {
    t.model
      .id()
      .x()
      .y()
      .height()
      .width()
      .addedBy()
      .appearance()
      .image()
      .score({ deprecation: "No longer supported" })
      .createdAt()
      .source()
      .updatedAt()
  },
})
