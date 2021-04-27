import { objectType, intArg, mutationField, nonNull, booleanArg } from "nexus";

export const Alias = objectType({
  name: "Alias",
  definition(t) {
    t.model
      .id()
      .name()
      .createdAt()
      .updatedAt()
  },
});