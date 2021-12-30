import { Prisma, PrismaClient, User } from "@prisma/client"
import { IndexableTag, SearchService } from "./search"
import { PrismaError } from "prisma-error-enum"

type TagOptions = {
  prisma: PrismaClient
  search: SearchService
}

export function makeTag({ prisma, search }: TagOptions) {
  async function findOrCreateTag(opts: UpsertTagOptions) {
    let tag = await methods.upsertTag(opts)
    return tag
  }

  const tryDelete = async <T>(f: Promise<T>): Promise<T | undefined> => {
    try {
      return await f
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === PrismaError.InterpretationError
      ) {
        return undefined
      } else {
        throw err
      }
    }
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
      const appearanceTag = {
        tagId: tag.id,
        appearanceId: opts.appearanceId,
      } as const
      return await prisma.appearanceTag.upsert({
        include: {
          tag: true,
        },
        where: {
          appearanceTag,
        },
        update: {},
        create: {
          ...appearanceTag,
          addedById: opts.user.id,
        },
      })
    },
    async deleteAppearanceTag(
      opts: UpsertTagOptions & { appearanceId: number }
    ) {
      const tag = await findOrCreateTag(opts)
      return tryDelete(
        prisma.appearanceTag.delete({
          include: {
            tag: true,
          },
          where: {
            appearanceTag: {
              tagId: tag.id,
              appearanceId: opts.appearanceId,
            },
          },
        })
      )
    },
    async addImageTag(opts: UpsertTagOptions & { imageId: number }) {
      const tag = await findOrCreateTag(opts)
      const imageTag = {
        tagId: tag.id,
        imageId: opts.imageId,
      }
      return await prisma.imageTag.upsert({
        include: {
          tag: true,
        },
        where: {
          imageTag,
        },
        update: {},
        create: {
          ...imageTag,
          addedById: opts.user.id,
        },
      })
    },
    async deleteImageTag(opts: UpsertTagOptions & { imageId: number }) {
      const tag = await findOrCreateTag(opts)
      return tryDelete(
        prisma.imageTag.delete({
          include: {
            tag: true,
          },
          where: {
            imageTag: {
              tagId: tag.id,
              imageId: opts.imageId,
            },
          },
        })
      )
    },
    async upsertTag(opts: UpsertTagOptions): Promise<IndexableTag> {
      const tagName = opts.tagName.trim()
      const data = {
        addedById: opts.user.id,
        name: tagName,
      }
      const tag = await prisma.tag.upsert({
        include: {
          category: true,
          aliases: true,
        },
        where: {
          name: tagName,
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
