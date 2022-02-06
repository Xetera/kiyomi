import type { PrismaClient, UploadType, Image } from "@prisma/client"
import type { UploadableImage, WasabiService } from "./wasabi"
import sizeOf from "image-size"
import { MimeType, Person, User } from "@prisma/client"
import {
  convertImage,
  mimetypeMappings,
  parseExtension,
  sha256Hash,
} from "../file"
import idgen from "nanoid"
import mimeType from "mime-types"
import { WendyService } from "./wendy"
import { siteEvent } from "@/lib/observer"

export type UploaderOptions = {
  prisma: PrismaClient
  wasabi: WasabiService
  wendy: WendyService
}

export class UploadError extends Error {
  constructor(message: string, public status: number = 400) {
    super(message)
    Object.setPrototypeOf(this, UploadError.prototype)
  }
}

export function makeUploader({ prisma, wasabi, wendy }: UploaderOptions) {
  const methods = {
    async uploadImage(opts: UploadOptions): Promise<Image> {
      const {
        id: ireneBotImageId,
        idolId: ireneBotIdolId,
        idolName: ireneBotIdolName,
      } = opts.irene || {}
      if (ireneBotImageId) {
        const existingImage = await prisma.image.findUnique({
          where: { ireneBotId: Number(ireneBotImageId) },
          select: { id: true },
        })
        if (existingImage) {
          throw new UploadError(
            `Image with irene id ${ireneBotImageId} already exists`
          )
        }
      }
      // const tags = fields.tags ? fields.tags.split(",") : []
      // const source = fields.source
      // const isPublic = fields?.public === "true" ?? false
      // if (!file) {
      //   return res.status(400).json({ error: "'file' missing" })
      // }
      const metadata = sizeOf(opts.buffer)
      if (!metadata.type) {
        throw new UploadError("invalid file type")
        // return res.json({ error: "invalid file type" })
      }

      const parsedMimetype = metadata.type.toUpperCase()
      if (!(parsedMimetype in MimeType)) {
        throw new UploadError(`Invalid mimetype: ${metadata.type}`)
      }
      const inputFormat = parseExtension(metadata.type)

      const webp = await convertImage(opts.buffer, inputFormat)

      const { format, height, width } = webp.info

      const buffer = webp.data
      const slug = idgen.nanoid(16)
      const slugWithExtension = `${slug}.${format}`
      if (!format) {
        throw new UploadError(`Invalid file format`)
      }
      const mime = mimeType.lookup(format)
      if (mime === false) {
        throw new UploadError("invalid file type")
      }
      const [hash, uploadResult] = await Promise.all([
        sha256Hash(buffer),
        wasabi.putImage({
          key: slugWithExtension,
          body: buffer,
          mimetype: mime || "image/webp",
        }),
      ])
      const status = uploadResult?.$metadata.httpStatusCode
      if (status && status >= 500) {
        console.log(uploadResult.$metadata)
        throw new UploadError(`Failed to upload image`, 500)
      }
      const databaseType = mimetypeMappings[format]
      if (!databaseType) {
        throw new UploadError(`unsupporeted type '${format}'`)
      }
      if (!width || !height) {
        throw new UploadError(`Could not determine the dimensions of the image`)
      }
      const image = await prisma.image.create({
        data: {
          ireneBotId: ireneBotImageId ? Number(ireneBotImageId) : undefined,
          fileName: opts.fileName,
          width,
          height,
          uploadType: opts.uploadType,
          mimetype: databaseType,
          hash: hash as string,
          public: opts.public,
          bytes: buffer.byteLength,
          // TODO: proper reference tracking
          source: opts.source,
          // TODO: deprecate NSFW
          isNsfw: false,
          slug,
          userId: opts.uploader.id,
          // TODO: better tagging
          // tags: {
          //   create: tags.map((tag) => {
          //     return {
          //       source: "USER",
          //       name: tag,
          //       addedBy: {
          //         connect: {
          //           id: opts.uploader.id,
          //         },
          //       },
          //     }
          //   }),
          // },
        },
      })
      let existingPerson: Person | undefined = ireneBotIdolId
        ? (await prisma.person.findUnique({
            where: { ireneBotId: Number(ireneBotIdolId) },
          })) ?? undefined
        : undefined

      // create a person if given an irene bot entry and a person for it doesn't exist yet
      if (ireneBotIdolName && !existingPerson) {
        existingPerson = await prisma.person.create({
          data: {
            ireneBotId: ireneBotIdolId ? Number(ireneBotIdolId) : undefined,
            name: ireneBotIdolName,
          },
        })
      }

      if (existingPerson) {
        await prisma.appearance.create({
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
                id: opts.uploader.id,
              },
            },
          },
        })
      }

      // this should be asynchronous
      wendy.fullLabel(image.slug).catch((err) => {
        console.error("Something went wrong trying to label an uploaded image")
        console.error(err)
      })

      siteEvent.image.upload$.next(image)

      return image
    },
  }
  return methods
}

export type UploaderService = ReturnType<typeof makeUploader>

export type IreneBotUploadOptions = {
  id: number
  idolId: number
  idolName: string
}

export type UploadOptions = {
  uploader: User
  uploadType: UploadType
  buffer: Buffer
  fileName?: string
  source?: string
  public: boolean
  irene?: IreneBotUploadOptions
}
