import { PrismaClient } from "@prisma/client"

type XpServiceProps = {
  prisma: PrismaClient
}

export type UserXpOptions = {
  from?: Date
  to?: Date
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
      console.log(result)
      return result[0].sum ?? 0
    },
  }
}

export type XpService = ReturnType<typeof makeXp>
