import {
  objectType,
  queryField,
  intArg,
  nonNull,
  stringArg,
  enumType,
} from "nexus";

export const User = objectType({
  name: "Tag",
  definition(t) {
    t.model.name();
    t.model.addedBy();
    t.model.source();
    t.model.createdAt();
    t.model.createdAt();
  },
});
