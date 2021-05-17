import {
  objectType,
  queryField,
  intArg,
  mutationField,
  nonNull,
  extendType,
} from "nexus";

export const Group = objectType({
  name: "Group",
  definition(t) {
    t.model
      .id()
      .name()
      .avatar()
      .banner()
      .aliases()
      .members()
      .createdAt()
      .updatedAt();
  },
});

export const PrivateMutation = mutationField((t) => {
  t.crud.upsertOneGroup();
});
