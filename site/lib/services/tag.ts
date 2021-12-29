import { PrismaClient, User } from "@prisma/client"
import { IndexableTag, SearchClient } from "./search"

type TagOptions = {
  prisma: PrismaClient
  search: SearchClient
}

export function makeTag({ prisma, search }: TagOptions) {
  return {
    async upsertTag(opts: UpsertTagOptions): Promise<IndexableTag> {
      const data = {
        addedById: opts.user.id,
        name: opts.tagName,
      }
      const tag = await prisma.tag.upsert({
        include: {
          category: true,
          aliases: true,
        },
        where: {
          name: opts.tagName,
        },
        update: data,
        create: data,
      })
      search.updateTag(tag).catch((err) => {
        console.error("couldn't update tag")
        console.error(err)
      })
      return tag
    },
  }
}

type UpsertTagOptions = {
  user: User
  tagName: string
}
