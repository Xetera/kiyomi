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
        async resolve(root, { where, ...args }, ctx, info, resolver) {
          // users can only query their own images
          const canView = ctx.user ? ctx.user.id === root.id : false;
          return resolver(
            root,
            {
              ...args,
              where: {
                ...where,
                ...(!canView ? { public: { equals: true } } : {}),
              },
            },
            ctx,
            info
          );
        },
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
