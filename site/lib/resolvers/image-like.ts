import { objectType, queryField, intArg, mutationField, nonNull, extendType } from "nexus";

export const ImageLike = objectType({
  name: "ImageLike",
  definition(t) {
    t.model
      .id()
      .user()
      .image()
      .createdAt()
      .updatedAt();
  },
});

