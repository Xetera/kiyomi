import { amqpConnectionUrl, AmqpService } from "../amqp"
import {
  Appearance,
  FaceSource,
  Person,
  Prisma,
  PrismaClient,
} from "@prisma/client"
import { createClient } from "celery-node"
import chunk from "lodash/chunk"
import { SimilarImage, similarImagesQuery } from "../db-queries"
import { PERCEPTUAL_HASH_TASK_NAME } from "../../../shared/messageQueue"
import { Routing } from "@/client/routing"

const VERY_GRACIOUS_WENDY_TIMEOUT = 1000 * 60 * 30

const wendyCelery = createClient(amqpConnectionUrl, process.env.REDIS_URL)

export const getPerceptualHash = wendyCelery.createTask(
  PERCEPTUAL_HASH_TASK_NAME
)

export type WendyOptions = {
  prisma: PrismaClient
  amqp: AmqpService
}

type Face = {
  x: number
  y: number
  width: number
  height: number
  encoding: number[]
}
type FullLabelResult = {
  hash: string
  colors: number[]
  faces: Face[]
}

export function makeWendy({ prisma, amqp }: WendyOptions) {
  const methods = {
    async me() {
      const wendyId = process.env.WENDY_USER_ID
      if (!wendyId) {
        console.error("Tried to label an image with a missing WENDY_USER_ID")
        throw Error("Cannot label image, wendy was not set up properly")
      }
      const user = await prisma.user.findUnique({
        where: {
          id: Number(wendyId),
        },
      })
      if (!user) {
        throw Error("Incorrect wendy user ID")
      }
      return user
    },
    async fullLabel(slug: string): Promise<unknown> {
      const user = await methods.me()
      const image = await prisma.image.findUnique({
        where: { slug },
        include: { appearances: true },
      })

      if (!image) {
        throw Error(`Image with slug ${slug} is not found`)
      }

      const taskName = `${process.env.LABELER_QUEUE_PREFIX}.full_label`
      const task = wendyCelery
        .createTask(taskName)
        .applyAsync([Routing.toRawImage(image)])
      const result: FullLabelResult = await task.get(
        VERY_GRACIOUS_WENDY_TIMEOUT
      )

      const { faces, colors, hash } = result
      let existingAppearance: Appearance | undefined

      const shouldLinkWithExistingAppearance =
        image.appearances.length === 1 && result.faces.length === 1

      if (shouldLinkWithExistingAppearance) {
        existingAppearance = image.appearances[0]
      }

      if (faces.length > 0) {
        // TODO: do this more intelligently
        await prisma.face.deleteMany({
          where: {
            imageId: image.id,
          },
        })
      }
      let existingPerson: Person | undefined = existingAppearance?.personId
        ? (await prisma.person.findUnique({
            where: { ireneBotId: existingAppearance.personId },
          })) ?? undefined
        : undefined

      if (existingPerson && !existingAppearance) {
        existingAppearance = await prisma.appearance.create({
          data: {
            image: {
              connect: {
                id: image.id,
              },
            },
            person: {
              connect: {
                id: existingPerson.id,
              },
            },
            addedBy: {
              connect: {
                id: user.id,
              },
            },
          },
        })
      }
      prisma.image
        .update({
          where: {
            slug,
          },
          data: {
            faceScanDate: new Date(),
            palette: colors,
          },
        })
        .catch((err) => {
          console.error(err)
        })

      const data: Prisma.FaceCreateManyInput[] = faces.map((face) => ({
        imageId: image.id,
        score: 0,
        x: face.x,
        y: face.y,
        width: face.width,
        height: face.height,
        addedById: user.id,
        appearanceId: existingAppearance?.id,
        source: user.bot ? FaceSource.Scan : FaceSource.Manual,
      }))
      await prisma.face.createMany({
        data,
      })
      return { status: "success", data: undefined }
    },
    hashStringToCube(hash: string): Uint8Array {
      // A14F4D8 -> [A1, F4, D8]
      const bytes = chunk(hash.split(""), 2)
      return Uint8Array.from(bytes, ([f, s]) => {
        const byte = (f as string) + (s as string)
        return parseInt(byte, 16)
      })
    },
    async mostSimilarImage(
      url: string
    ): Promise<{
      hash: string
      cube: Uint8Array
      result: SimilarImage | undefined
    }> {
      const hash: string = await getPerceptualHash.applyAsync([url]).get(6000)
      const cube = methods.hashStringToCube(hash)
      const similarImages = await similarImagesQuery(cube)
      return { hash, cube, result: similarImages[0] }
    },
    isNearPerfectMatch(distance: number): boolean {
      return distance <= 5
    },
  }
  return methods
}

export type WendyService = ReturnType<typeof makeWendy>
