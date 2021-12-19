import type {
  DiscoveredImageVote,
  DiscoveredPost,
  PrismaClient,
} from "@prisma/client"
import camelCaseKeys from "camelcase-keys"

export type DiscoveryOptions = {
  prisma: PrismaClient
}

export function makeDiscovery({ prisma }: DiscoveryOptions) {
  return {
    async postsByPerson(peopleId: number[]): Promise<Array<DiscoveredPost>> {
      return prisma.discoveredPost.findMany({
        where: {
          referencingGroups: {
            hasSome: peopleId,
          },
        },
      })
    },
    async postsByGroup(groupId: number): Promise<Array<DiscoveredPost>> {
      const groupAndMembers = await prisma.group.findUnique({
        include: {
          members: {
            include: {
              person: true,
            },
          },
        },
        where: {
          id: groupId,
        },
      })
      if (!groupAndMembers) {
        // TODO: turn this into an error
        return []
      }
      const peopleIds = groupAndMembers.members.map(
        (member) => member.person.id
      )
      return prisma.discoveredPost.findMany({
        where: {
          OR: [
            {
              referencingGroups: {
                has: groupAndMembers.id,
              },
            },
            {
              referencingPeople: {
                hasSome: peopleIds,
              },
            },
          ],
        },
      })
    },
    async discoveryStats(userId: number): Promise<any> {
      const counts = await prisma.discoveredImageVote.groupBy({
        by: ["verdict"],
        where: {
          userId,
        },
        _count: {
          verdict: true,
        },
      })
      return counts.map(({ verdict, _count }) => ({
        verdict,
        count: _count.verdict,
      }))
    },
    async personalFeed({
      userId,
      skip = 0,
      take = 30,
      groupIds = [],
      peopleIds = [],
    }: PersonalFeedInput): Promise<Array<DiscoveredPost>> {
      const results = await prisma.$queryRaw(
        `
      SELECT dp.*
      FROM discovered_posts dp
      WHERE (
        WITH liked_images AS (
            SELECT di.id FROM discovered_images di
              WHERE dp.id = di.post_id
            INTERSECT
            SELECT div.discovered_image_id FROM discovered_image_votes div
              WHERE div.user_id = $1
        ),
         all_images AS (
             SELECT di.id
             FROM discovered_images di
             WHERE dp.id = di.post_id
         )
         SELECT (SELECT COUNT(*) FROM liked_images) = (SELECT COUNT(*) FROM all_images)
      ) = False
      AND (
        cardinality($2::integer[] || $3::integer[]) = 0 OR (
          (cardinality($2::integer[]) > 0 AND dp.referencing_groups && $2)
          OR (cardinality($3::integer[]) > 0 AND dp.referencing_people && $3)
        )
      )
      ORDER BY original_post_date desc, created_at desc
      OFFSET $4
      LIMIT $5
      `,
        userId,
        groupIds,
        peopleIds,
        skip,
        take
      )
      return results.map(camelCaseKeys)
    },
    async votePost(args: DiscoveryPostVoteInput): Promise<number> {
      const images = await prisma.discoveredImage.findMany({
        where: {
          postId: args.postId,
        },
      })
      const results = await prisma.discoveredImageVote.createMany({
        data: images.map((image) => ({
          discoveredImageId: image.id,
          verdict: args.verdict,
          reason: args.reason,
          userId: args.userId,
        })),
        skipDuplicates: true,
      })
      return results.count
    },
    voteImage(args: DiscoveryImageVoteInput): Promise<DiscoveredImageVote> {
      return prisma.discoveredImageVote.upsert({
        where: {
          userVote: {
            discoveredImageId: args.imageId,
            userId: args.userId,
          },
        },
        update: {
          verdict: args.verdict,
          reason: args.reason,
        },
        create: {
          discoveredImageId: args.imageId,
          userId: args.userId,
          verdict: args.verdict,
          reason: args.reason,
        },
      })
    },
  }
}

type PartialDiscoveryVote = {
  userId: number
  reason?: string
  verdict: string
}

type DiscoveryPostVoteInput = PartialDiscoveryVote & {
  postId: number
}

type DiscoveryImageVoteInput = PartialDiscoveryVote & {
  imageId: number
}

type PersonalFeedInput = {
  userId: number
  take: number
  skip: number
  groupIds?: number[]
  peopleIds?: number[]
}

export type DiscoveryService = ReturnType<typeof makeDiscovery>
