import { Person, PrismaClient } from "@prisma/client"
import {
  Gender,
  MutationUpdatePersonArgs,
  UpdatePersonInputs,
} from "@/lib/__generated__/graphql"

export type PersonServiceOptions = {
  prisma: PrismaClient
}

export const makePerson = ({ prisma }: PersonServiceOptions) => {
  return {
    async updatePerson(id: number, p: UpdatePersonOptions): Promise<Person> {
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
      return newPerson
    },
  }
}

type GroupMembership = {
  id: number
  startDate?: Date
  endDate?: Date
}

type UpdatePersonOptions = UpdatePersonInputs
// type UpdatePersonOptions = {
//   id: number
//   name?: string
//   description?: string
//   gender: Gender
//   // alias names
//   aliases: string[]
//   preferredAliasId?: number
//   // ids
//   groups: GroupMembership[]
//   preferredMembershipId?: number
//   avatarId?: number
//   bannerId?: number
// }

export type PersonService = ReturnType<typeof makePerson>
