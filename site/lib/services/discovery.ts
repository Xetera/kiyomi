import type { DiscoveredImageVote, DiscoveredPost } from "@prisma/client"
import { prisma } from "../db"
import camelCaseKeys from "camelcase-keys"

export function makeDiscovery(): DiscoveryService {
  return {
    async personalFeed({ userId, skip = 0, take = 30 }) {
      const results = await prisma.$queryRaw`
      SELECT dp.*
      FROM discovered_posts dp
      WHERE (
        WITH liked_images AS (
            SELECT di.id FROM discovered_images di
              WHERE dp.id = di.post_id
            INTERSECT
            SELECT div.discovered_image_id FROM discovered_image_votes div
              WHERE div.user_id = ${userId}
        ),
         all_images AS (
             SELECT di.id
             FROM discovered_images di
             WHERE dp.id = di.post_id
         )
      SELECT (SELECT COUNT(*) FROM liked_images) = (SELECT COUNT(*) FROM all_images)) = False
      ORDER BY original_post_date desc, created_at
      OFFSET ${skip}
      LIMIT ${take}
      `
      return results.map(camelCaseKeys)
    },
    async votePost(args) {
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
    voteImage(args) {
      return prisma.discoveredImageVote.create({
        data: {
          discoveredImageId: args.imageId,
          verdict: args.verdict,
          reason: args.reason,
          userId: args.userId,
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
}

export type DiscoveryService = {
  voteImage(input: DiscoveryImageVoteInput): Promise<DiscoveredImageVote>
  votePost(input: DiscoveryPostVoteInput): Promise<number>
  personalFeed(input: PersonalFeedInput): Promise<DiscoveredPost[]>
}
