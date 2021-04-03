import { objectType } from "nexus";

export const Role = objectType({
  name: "Role",
  definition(t) {
    t.model.name().createdAt();
  },
});
