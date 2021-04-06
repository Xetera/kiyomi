import { objectType, queryField, intArg } from "nexus";

export const Person = objectType({
  name: "Person",
  definition(t) {
    t.model.id().name().updatedAt().createdAt();
  },
});
