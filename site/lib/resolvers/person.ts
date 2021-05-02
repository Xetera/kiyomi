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
      .updatedAt()
      .createdAt();
  },
});

export const Query = queryField((t) => {
  t.field("searchPerson", {
    type: nonNull(list(nonNull("Person"))),
    args: {
      query: nonNull(stringArg()),
    },
    async resolve(_, args, ctx) {
      return ctx.prisma.$queryRaw(
        `
        SELECT * FROM persons where persons.name ILIKE $1 LIMIT 25;
      `,
        `%${args.query}%`
      );
    },
  });
});

export const PrivateQuery = queryField(t => {
  t.crud.people({ pagination: true, filtering: true });
})

export const PrivateMutation = mutationField(t => {
  t.crud.createOnePerson()
  t.crud.upsertOnePerson()
})