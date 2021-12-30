import { PrismaClient, Tag, User } from "@prisma/client"
import { IndexableTag, SearchService } from "./search"

type TagOptions = {
  prisma: PrismaClient
  search: SearchService
}

export function makeTag({ prisma, search }: TagOptions) {
  async function findOrCreateTag(opts: UpsertTagOptions) {
    let tag = await prisma.tag.findUnique({ where: { name: opts.tagName } })
    if (!tag) {
      tag = await methods.upsertTag(opts)
    }
    return tag
  }

  async function findTag(name: string) {
    const tag = await prisma.tag.findUnique({ where: { name } })
    if (!tag) {
      throw Error("Invalid tag")
    }
    return tag
  }
  const methods = {
    async addAppearanceTag(opts: UpsertTagOptions & { appearanceId: number }) {
      const tag = await findOrCreateTag(opts)
      return await prisma.appearanceTag.create({
        data: {
          tagId: tag.id,
          appearanceId: opts.appearanceId,
          addedById: opts.user.id,
        },
      })
    },
    async deleteAppearanceTag(opts: { tagName: string; appearanceId: number }) {
      const tag = await findTag(opts.tagName)
      return prisma.appearanceTag.delete({
        where: {
          appearanceTag: {
            tagId: tag.id,
            appearanceId: opts.appearanceId,
          },
        },
      })
    },
    async addImageTag(opts: UpsertTagOptions & { imageId: number }) {
      const tag = await findOrCreateTag(opts)
      return await prisma.imageTag.create({
        data: {
          tagId: tag.id,
          imageId: opts.imageId,
          addedById: opts.user.id,
        },
      })
    },
    async deleteImageTag(opts: { tagName: string; imageId: number }) {
      const tag = await findTag(opts.tagName)
      return prisma.imageTag.delete({
        where: {
          imageTag: {
            tagId: tag.id,
            imageId: opts.imageId,
          },
        },
      })
    },
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
        create: {
          ...data,
        },
      })
      // TODO: turn into a UNION db call?
      const [images, appearances] = await Promise.all([
        prisma.imageTag.count({
          where: { tagId: tag.id },
        }),
        prisma.appearanceTag.count({
          where: { tagId: tag.id },
        }),
      ])
      const updatable = {
        ...tag,
        count: images + appearances,
      }
      search.updateTag(updatable).catch((err) => {
        console.error("couldn't update tag")
        console.error(err)
      })
      return updatable
    },
  }
  return methods
}

export type TagService = ReturnType<typeof makeTag>

type UpsertTagOptions = {
  user: User
  tagName: string
  // TODO: category / alias creation?
  // category?: string
  // aliases?: string[]
}
