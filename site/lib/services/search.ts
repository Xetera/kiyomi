import { Client } from "typesense"
import { NodeConfiguration } from "typesense/lib/Typesense/Configuration"
import type {
  Alias,
  Group,
  GroupMember,
  Person,
  PrismaClient,
  Tag,
  TagAlias,
  TagCategory,
  GroupAlias,
} from "@prisma/client"
import { CollectionCreateSchema } from "typesense/lib/Typesense/Collections"
import {
  IndexedGroup,
  IndexedPerson,
  IndexedTag,
  searchGroupsName,
  searchPeopleName,
} from "../../../shared/search"

export type SearchOptions = {
  prisma: PrismaClient
}

export type IndexableGroup = Group & {
  aliases: GroupAlias[]
  members: GroupMember[]
}

export type IndexablePerson = Person & {
  aliases: Alias[]
  memberOf: GroupMember[]
}

export type IndexableTag = Tag & {
  category: TagCategory | null
  aliases: TagAlias[]
  count: number
}

export function makeSearch({ prisma }: SearchOptions) {
  const typesense = new Client({
    apiKey: process.env.NEXT_PUBLIC_TYPESENSE_KEY!,
    nodes: [
      {
        url: process.env.NEXT_PUBLIC_TYPESENSE_URL,
      } as NodeConfiguration,
    ],
  })
  const methods = {
    toIndexedPerson(person: IndexablePerson): IndexedPerson {
      return {
        id: String(person.id),
        personId: person.id,
        name: person.name,
        aliases: person.aliases.map((alias) => alias.name),
        preferredAlias: person.aliases?.find(
          (alias) => alias.id === person.preferredAliasId
        )?.name,
        groups: person.memberOf.map((mem) => mem.groupId),
        // TODO: get age calculations working
        age: undefined,
      }
    },
    toIndexedGroup(group: IndexableGroup): IndexedGroup {
      if (group.id === 29) {
        console.log(group)
      }
      return {
        id: String(group.id),
        groupId: group.id,
        name: group.name,
        aliases: group.aliases.map((a) => a.name),
        members: group.members.map((member) => member.personId),
      }
    },
    async fullGroupRefresh() {
      const groups = await prisma.group.findMany({
        include: {
          aliases: true,
          members: true,
        },
      })
      const collectionName = searchGroupsName()
      if (process.env.NODE_ENV !== "production") {
        console.warn(`Dropping typesense collection: ${collectionName}`)
        await typesense
          .collections(collectionName)
          .delete()
          .catch(() => {})
        await typesense
          .collections()
          .create(groupSchema)
          .catch(() => {})
      }
      const indexedPeople = groups.map(methods.toIndexedGroup)
      return typesense
        .collections(collectionName)
        .documents()
        .import(indexedPeople)
        .catch(console.error)
    },
    async fullPersonRefresh() {
      const people = await prisma.person.findMany({
        include: {
          aliases: true,
          memberOf: true,
        },
      })
      const collectionName = searchPeopleName()
      if (process.env.NODE_ENV !== "production") {
        console.warn(`Dropping typesense collection: ${collectionName}`)
        await typesense
          .collections(collectionName)
          .delete()
          .catch(() => {})
        await typesense
          .collections()
          .create(personSchema)
          .catch(() => {})
      }
      const indexedPeople = people.map(methods.toIndexedPerson)
      return typesense
        .collections(collectionName)
        .documents()
        .import(indexedPeople)
    },
    toIndexedTag(tag: IndexableTag): IndexedTag {
      return {
        id: String(tag.id),
        name: tag.name,
        category: tag.category?.name,
        aliases: tag.aliases.map((al) => al.name),
        count: tag.count,
      }
    },
    async updateTag(tag: IndexableTag) {
      await typesense
        .collections("tags")
        .documents()
        .upsert(methods.toIndexedTag(tag))
        .then(console.log)
        .catch(console.error)
    },
  }
  return methods
}

export type SearchService = ReturnType<typeof makeSearch>

const personSchema: CollectionCreateSchema = {
  name: searchPeopleName(),
  fields: [
    {
      name: "name",
      type: "string",
      facet: true,
    },
    {
      name: "age",
      type: "int32",
      optional: true,
    },
    {
      name: "aliases",
      type: "string[]",
      facet: true,
    },
    {
      name: "preferredAlias",
      type: "string",
      optional: true,
      facet: true,
    },
    {
      name: "groups",
      type: "int32[]",
    },
  ],
}

const groupSchema: CollectionCreateSchema = {
  name: searchGroupsName(),
  fields: [
    {
      name: "name",
      type: "string",
      facet: true,
    },
    {
      name: "groupId",
      type: "int32",
    },
    {
      name: "aliases",
      type: "string[]",
      facet: true,
    },
    {
      name: "members",
      type: "int32[]",
      optional: true,
    },
  ],
}
