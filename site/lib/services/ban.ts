import { PrismaClient, RestrictionKind } from "@prisma/client"
import { siteEvent } from "@/lib/observer"

export type BanServiceOptions = {
  prisma: PrismaClient
}

export const makeBan = ({ prisma }: BanServiceOptions) => {
  return {
    async restrictUser(opts: RestrictUserOptions) {
      const restriction = await prisma.userRestriction.create({
        data: {
          associatedEntityId: opts.associatedEntity,
          userId: opts.userId,
          addedById: opts.moderatorId,
          restriction: opts.restriction,
        },
      })
      siteEvent.user.restrict$.next({ restriction, event: opts })
      return restriction
    },
  }
}

export type RestrictUserOptions = {
  userId: number
  restriction: RestrictionKind
  moderatorId?: number
  associatedEntity?: number
}

export type BanService = ReturnType<typeof makeBan>
