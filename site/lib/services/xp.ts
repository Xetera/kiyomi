import { PrismaClient } from "@prisma/client"
import camelCaseKeys from "camelcase-keys"

type XpServiceProps = {
  prisma: PrismaClient
}

export type DateRange = {
  from?: Date
  to?: Date
}

export type Pagination = {
  skip: number
  take: number
}

type LeaderboardRow = {
  xp: number
  userId: number
  rank: number
}

export const makeXp = ({ prisma }: XpServiceProps) => {
  return {
    async leaderboard({
      skip,
      take,
      from,
      to,
    }: DateRange & Pagination): Promise<LeaderboardRow[]> {
      // TODO: turn this reused xps CTE into a materialized view
      // we're using signup date as an XP tiebreaker
      type Result = LeaderboardRow
      const results: Result[] = await prisma.$queryRawUnsafe(
        `
        WITH xps AS (
            SELECT SUM(xp) AS xp, user_id, MAX(created_at) AS signup_date
            FROM discovered_image_votes
            WHERE ($1::timestamp IS NULL OR created_at >= $1::timestamp)
                AND ($2::timestamp IS NULL OR created_at <= $2::timestamp)
            GROUP BY user_id
        ),
        results AS (
            SELECT COALESCE(SUM(xps.xp), 0) AS xp, users.id AS user_id
            FROM users
                  LEFT OUTER JOIN xps ON xps.user_id = users.id
            GROUP BY users.id, signup_date
            ORDER BY xp
        )
        SELECT results.*, ROW_NUMBER() OVER (ORDER BY xp DESC) AS rank
        FROM results
        OFFSET $3
        LIMIT $4
      `,
        from,
        to,
        skip,
        take
      )
      return results.map((obj) => camelCaseKeys(obj))
    },
    async userXp(userId: number) {
      type Result = { sum: number }
      const result: Result[] = await prisma.$queryRaw`
        WITH xps AS (
          SELECT SUM(xp) as xp FROM discovered_image_votes
            WHERE user_id = ${userId}
        )
        SELECT COALESCE(SUM(xp), 0) as sum FROM xps
      `
      return result[0]?.sum ?? 0
    },
  }
}

export type XpService = ReturnType<typeof makeXp>
