import { list, mutationField, nonNull, objectType, queryField } from "nexus"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime"
import { PrismaError } from "prisma-error-enum"
import { GraphQLError } from "graphql"
import { Context } from "@/lib/context-type"

export const DiscoveredPost = objectType({
  name: "DiscoveredPost",
  definition(t) {
    t.model
      .id()
      .uniqueIdentifier()
      .discoveredImages({ alias: "images" })
      .body()
      .postUrl()
      .providerType()
      .accountName()
      .accountAvatarUrl()
      .originalPostDate()
      .createdAt()
      .updatedAt()
    t.field("referencingPeople", {
      type: nonNull(list(nonNull("Person"))),
      description:
        "People who are associated with the social media account that created this post.",
      resolve(root, _, { prisma }) {
        if (!root.referencingPeople) {
          return []
        }
        return prisma.person.findMany({
          where: {
            id: {
              in: root.referencingPeople,
            },
          },
        })
      },
    })
    t.field("referencingGroups", {
      type: nonNull(list(nonNull("Group"))),
      description:
        "Groups who are associated with the social media account that created this post.",
      resolve(root, _, { prisma }) {
        if (!root.referencingGroups) {
          return []
        }
        return prisma.group.findMany({
          where: {
            id: {
              in: root.referencingGroups,
            },
          },
        })
      },
    })
  },
})

export const Query = queryField((t) => {
  t.field("discoveryFeed", {
    type: nonNull(list(nonNull("DiscoveredPost"))),
    args: {
      take: "Int",
      skip: "Int",
      groupIds: nonNull(list(nonNull("Int"))),
      peopleIds: nonNull(list(nonNull("Int"))),
    },
    async resolve(_, args, { user, prisma, discovery }) {
      const DEFAULT_TAKE = 30
      if (!user) {
        return prisma.discoveredPost.findMany({
          skip: args.skip ?? 0,
          take: args.take ?? DEFAULT_TAKE,
        })
      }

      return discovery.personalFeed({
        skip: args.skip ?? 0,
        take: args.take ?? DEFAULT_TAKE,
        userId: user.id,
        groupIds: args.groupIds,
        peopleIds: args.peopleIds,
      })
    },
  })
  t.crud.discoveredPosts({
    pagination: true,
    filtering: true,
    ordering: true,
  })
})

export const Mutation = mutationField((t) => {
  t.field("discoveredPostVote", {
    type: nonNull(list(nonNull("DiscoveredImage"))),
    description: "Vote using the same verdict on all images in a post",
    args: {
      postId: nonNull("Int"),
      verdict: nonNull("String"),
      reason: "String",
    },
    async authorize(_, __, { user }: Context) {
      return Boolean(user)
    },
    async resolve(_, args, { discovery, user, prisma }) {
      try {
        await discovery.votePost({
          postId: args.postId,
          verdict: args.verdict,
          reason: args.reason ?? undefined,
          userId: user!.id,
        })
        return prisma.discoveredImage.findMany({
          where: {
            postId: args.postId,
          },
        })
      } catch (err) {
        if (
          err instanceof PrismaClientKnownRequestError &&
          err.code === PrismaError.UniqueConstraintViolation
        ) {
          console.log(err)
          throw new GraphQLError("Already voted on that image")
        }
        throw err
      }
    },
  })
})
