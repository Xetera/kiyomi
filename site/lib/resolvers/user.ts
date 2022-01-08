import { arg, intArg, list, nonNull, objectType, queryField } from "nexus"
import { hasRole, Role } from "@/lib/permissions"

export const LeaderboardUser = objectType({
  name: "LeaderboardUser",
  definition(t) {
    t.field("rank", {
      type: nonNull("Int"),
    })
    t.field("xp", {
      type: nonNull("Int"),
    })
    t.field("user", {
      type: nonNull("User"),
    })
  },
})

export const User = objectType({
  name: "User",
  definition(t) {
    t.model
      .id()
      .avatar()
      .name()
      .roles({ pagination: false })
      .image()
      .bot()
      .images({
        pagination: true,
        ordering: true,
        filtering: true,
        async resolve(root, { where, ...args }, ctx, info, resolver) {
          const MAX_IMAGES_PAGE = 100
          // users can only query their own images
          const canView = ctx.user ? ctx.user.id === root.id : false
          return resolver(
            root,
            {
              ...args,
              take: Math.min(args.take ?? MAX_IMAGES_PAGE, MAX_IMAGES_PAGE),
              where: {
                ...where,
                ...(!canView ? { public: { equals: true } } : {}),
              },
            },
            ctx,
            info
          )
        },
      })
      .createdAt()
    t.field("xp", {
      type: "Int",
      resolve(root, _, { prisma, xp }) {
        return xp.userXp(root.id)
      },
    })
  },
})

export const UserNotifications = objectType({
  name: "UserNotifications",
  definition(t) {
    t.int("unreadReports")
  },
})

export const Query = queryField((t) => {
  t.field("user", {
    type: "User",
    args: {
      id: intArg(),
    },
    resolve(_root, args, { prisma }) {
      const { id } = args
      if (!id) {
        return null
      }
      return prisma.user.findUnique({ where: { id } })
    },
  })
  t.field("me", {
    type: "User",
    resolve(_root, _args, { prisma, user }) {
      if (!user?.id) {
        return null
      }
      return prisma.user.findUnique({ where: { id: user.id } })
    },
  })
  t.field("notifications", {
    type: nonNull(UserNotifications),
    async resolve(_, __, { user, prisma, report }) {
      const isModerator = user ? hasRole(user.roles, Role.Moderator) : false
      return {
        unreadReports: isModerator ? await report.pendingReportCount() : null,
      }
    },
  })
  t.field("discoveryLeaderboard", {
    type: nonNull(list(nonNull(LeaderboardUser))),
    args: {
      take: arg({
        type: "Int",
        default: 10,
      }),
      skip: arg({
        type: "Int",
        default: 0,
      }),
    },
    async resolve(t, { take, skip }, { prisma, xp }) {
      const rows = await xp.leaderboard({
        take: take ?? 10,
        skip: skip ?? 0,
      })
      const userIds = rows.map((row) => row.userId)
      const users = await prisma.user.findMany({
        where: {
          id: {
            in: userIds,
          },
        },
      })
      return rows.map(({ userId, rank, xp }) => {
        const user = users.find((user) => user.id === userId)
        return {
          user,
          xp,
          rank,
        }
      })
    },
  })
})
