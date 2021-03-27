import { objectType, queryField, intArg } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.model
      .id()
      .name()
      .image({
        alias: "avatar",
      })
      .images({
        pagination: true,
        filtering: true,
      });
  },
});

export const Query = queryField((t) => {
  t.field("user", {
    type: "User",
    args: {
      id: intArg(),
    },
    resolve(_root, args, { prisma }) {
      const { id } = args;
      if (!id) {
        return null;
      }
      return prisma.user.findUnique({ where: { id } });
    },
  });
  t.field("me", {
    type: "User",
    resolve(_root, args, { prisma, user }) {
      if (!user) {
        return null;
      }
      return prisma.user.findUnique({ where: { id: user.id } });
    },
  });
});
