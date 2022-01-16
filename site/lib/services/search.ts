import { Client } from "typesense"
import { NodeConfiguration } from "typesense/lib/Typesense/Configuration"
import type {
  Alias,
  Group,
  GroupAlias,
  GroupMember,
  Person,
  PrismaClient,
  Tag,
  TagAlias,
  TagCategory,
} from "@prisma/client"
import { Image } from "@prisma/client"
import { CollectionCreateSchema } from "typesense/lib/Typesense/Collections"
import {
  IndexedGroup,
  IndexedPerson,
  IndexedTag,
  searchGroupsName,
  searchPeopleName,
} from "../../../shared/search"
import { ImageProxyService } from "@/lib/services/image-proxy"

export type SearchOptions = {
  prisma: PrismaClient
  imageProxy: ImageProxyService
}

export type IndexableGroup = Group & {
  aliases: GroupAlias[]
  members: GroupMember[]
}

export type IndexablePerson = Person & {
  avatar?: Image | null
  aliases: Alias[]
  memberOf: Array<GroupMember & { group: Group }>
  preferredMembership?: (GroupMember & { group: Group }) | null
}

export type IndexableTag = Tag & {
  category: TagCategory | null
  aliases: TagAlias[]
  count: number
}

export function makeSearch({ prisma, imageProxy }: SearchOptions) {
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
      const thumbnails = person.avatar
        ? imageProxy.thumbnails(person.avatar)
        : undefined
      const preferredGroup =
        person.preferredMembership?.group ?? person.memberOf?.[0]?.group
      return {
        id: String(person.id),
        personId: person.id,
        name: person.name,
        thumbnailSmall: thumbnails?.small,
        thumbnailMedium: thumbnails?.medium,
        thumbnailLarge: thumbnails?.large,
        aliases: person.aliases.map((alias) => alias.name),
        preferredAlias: person.aliases?.find(
          (alias) => alias.id === person.preferredAliasId
        )?.name,
        preferredGroupName: preferredGroup?.name,
        groups: person.memberOf.map((mem) => mem.groupId),
        // TODO: get age calculations working
        age: undefined,
      }
    },
    toIndexedGroup(group: IndexableGroup): IndexedGroup {
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
          avatar: true,
          aliases: true,
          memberOf: {
            include: {
              group: true,
            },
          },
          preferredMembership: {
            include: {
              group: true,
            },
          },
        },
      })
      const collectionName = searchPeopleName()
      if (process.env.NODE_ENV !== "production") {
        console.warn(`Dropping typesense collection: ${collectionName}`)
        await typesense
          .collections(collectionName)
          .delete()
          .catch(() => {})
        await typesense.collections().create(personSchema).catch(console.error)
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
    {
      name: "preferredGroupName",
      type: "string",
      optional: true,
      facet: true,
    },
    {
      name: "thumbnailSmall",
      optional: true,
      type: "string",
    },
    {
      name: "thumbnailMedium",
      optional: true,
      type: "string",
    },
    {
      name: "thumbnailLarge",
      optional: true,
      type: "string",
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
