import { PrismaClient } from "@prisma/client"

type XpServiceProps = {
  prisma: PrismaClient
}

export const makeXp = ({ prisma }: XpServiceProps) => {
  return {
    async userXp(userId: number) {
      const result = await prisma.$queryRaw`
        WITH xps AS (
          SELECT SUM(xp) as xp FROM discovered_image_votes
            WHERE user_id = ${userId}
        )
        SELECT SUM(xp) as sum FROM xps
      `
      // UNION
      // SELECT SUM(xp) as xp FROM images
      //  WHERE user_id = ${userId}
      return result[0].sum
    },
  }
}

export type XpService = ReturnType<typeof makeXp>
