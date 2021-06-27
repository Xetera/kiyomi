import { objectType, queryField, mutationField, nonNull, list } from "nexus"

export const Group = objectType({
  name: "Group",
  definition(t) {
    t.model
      .id()
      .name()
      .avatar()
      .banner()
      .aliases()
      .members()
      .createdAt()
      .updatedAt()
  },
})

export type ImageCount = {}

export const AppearanceCount = objectType({
  name: "AppearanceCount",
  definition(t) {
    t.nonNull.field("group", {
      type: "Group",
    })
    t.nonNull.int("count")
  },
})

export const Query = queryField((t) => {
  t.crud.group()
  t.crud.groups({ pagination: true, filtering: true, ordering: true })
  t.field("countAppearances", {
    type: nonNull(list(nonNull(AppearanceCount))),
    args: {
      groups: nonNull(list(nonNull("Int"))),
    },
    async resolve(_, { groups: groupIds }, { prisma }) {
      const result: Array<{
        id: number
        count: number
      }> = await prisma.$queryRaw(
        `
        SELECT g.id, COUNT(*) as count
        FROM images
                join appearances a on images.id = a.image_id
                join persons p on a.person_id = p.id
                join group_members gm on p.id = gm."personId"
                join groups g on gm."groupId" = g.id
        where g.id = ANY($1)
        group by g.id;
      `,
        groupIds
      )
      const groups = await prisma.group.findMany({
        where: { id: { in: result.map((res) => res.id) } },
      })
      return result.map((res) => {
        return {
          group: groups.find((g) => g.id === res.id)!,
          count: res.count,
        }
      })
    },
  })
})

export const PrivateMutation = mutationField((t) => {
  t.crud.upsertOneGroup()
})
