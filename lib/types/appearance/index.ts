import { objectType, queryField, intArg } from "nexus";

export const Appearance = objectType({
  name: "Appearance",
  definition(t) {
    t.model.id().person().addedBy().faces().createdAt().updatedAt();
  },
});
