import {
  objectType,
  queryField,
  intArg,
  queryType,
  nonNull,
  stringArg,
  list,
} from "nexus";

export const Person = objectType({
  name: "Person",
  definition(t) {
    t.model
      .id()
      .name()
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
        SELECT * FROM persons where name ILIKE $1 LIMIT 25;
      `,
        `%${args.query}%`
      );
    },
  });
});
