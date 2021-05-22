import {
  objectType,
  queryField,
  nonNull,
  stringArg,
  list,
  mutationField,
} from "nexus";

export const Person = objectType({
  name: "Person",
  definition(t) {
    t.model
      .id()
      .name()
      .aliases()
      .preferredAlias()
      .memberOf()
      .updatedAt()
      .createdAt();
  },
});

export const PrivateQuery = queryField((t) => {
  t.crud.people({ pagination: true, filtering: true });
});

export const PrivateMutation = mutationField((t) => {
  t.crud.createOnePerson();
  t.crud.upsertOnePerson();
});
