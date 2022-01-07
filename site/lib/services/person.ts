import { Person, PrismaClient } from "@prisma/client"
import { UpdatePersonInputs } from "@/lib/__generated__/graphql"
import { siteEvent } from "@/lib/observer"

export type PersonServiceOptions = {
  prisma: PrismaClient
}

export type UpdatePersonOptions = {
  personId: number
  userId: number
  input: UpdatePersonInputs
}

export const makePerson = ({ prisma }: PersonServiceOptions) => {
  return {
    async updatePerson(arg: UpdatePersonOptions): Promise<Person> {
      const { input: p, personId: id } = arg
      const person = await prisma.person.findUnique({
        where: { id },
        include: {
          memberOf: true,
          preferredAlias: true,
          aliases: true,
        },
      })
      if (!person) {
        throw Error("Invalid person")
      }
      const aliasToRemove = person.aliases
        .filter((alias) => !p.aliases.includes(alias.name))
        .map((al) => al.name)
      const existingAliases = person.aliases.map((al) => al.name)
      const aliasToAdd = p.aliases.filter(
        (alias) => !existingAliases.includes(alias)
      )
      const existingGroups = person.memberOf
      const groupsToAdd = p.groups.filter(
        (group) => !existingGroups.some((g) => g.id === group.id)
      )
      const newGroups = p.groups.map((g) => g.id)
      const groupsToRemove = existingGroups
        .filter((group) => !newGroups.includes(group.id))
        .map((g) => g.id)
      const [newPerson] = await prisma.$transaction([
        prisma.person.update({
          where: { id },
          data: {
            name: p.name,
            gender: p.gender,
            avatarId: p.avatarId,
            bannerId: p.bannerId,
            birthDate: p.birthDate ? new Date(p.birthDate) : null,
            description: p.description,
            preferredMembershipId: p.preferredMembershipId,
            preferredAliasId: p.preferredAliasId,
          },
        }),
        prisma.alias.deleteMany({
          where: {
            name: {
              in: aliasToRemove,
            },
          },
        }),
        prisma.alias.createMany({
          skipDuplicates: true,
          data: aliasToAdd.map((name) => ({
            personId: id,
            name,
          })),
        }),
        prisma.groupMember.deleteMany({
          where: { id: { in: groupsToRemove } },
        }),
        prisma.groupMember.createMany({
          skipDuplicates: true,
          data: groupsToAdd.map((g) => ({
            personId: id,
            groupId: g.id,
            startDate: g.startDate,
            endDate: g.endDate,
          })),
        }),
      ])
      siteEvent.person.update$.next(arg)
      return newPerson
    },
  }
}

type GroupMembership = {
  id: number
  startDate?: Date
  endDate?: Date
}

export type PersonService = ReturnType<typeof makePerson>
