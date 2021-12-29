import { Client } from "typesense"
import { NodeConfiguration } from "typesense/lib/Typesense/Configuration"
import { PrismaClient, Tag, TagCategory, TagAlias } from "@prisma/client"

export type SearchOptions = {
  prisma: PrismaClient
}

export type IndexedTag = {
  tagId: number
  name: string
  aliases: string[]
  category?: string
}

export type IndexableTag = Tag & {
  category: TagCategory | null
  aliases: TagAlias[]
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
    toIndexedTag(tag: IndexableTag): IndexedTag {
      return {
        tagId: tag.id,
        name: tag.name,
        category: tag.category?.name,
        aliases: tag.aliases.map((al) => al.name),
      }
    },
    async updateTag(tag: IndexableTag) {
      await typesense
        .collections("tags")
        .documents()
        .upsert(methods.toIndexedTag(tag))
    },
  }
  return methods
}

export type SearchClient = ReturnType<typeof makeSearch>
