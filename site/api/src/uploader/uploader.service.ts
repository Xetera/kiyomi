import { Injectable, Logger } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import {
  Image,
  MimeType,
  Person,
  UploadDestination,
  UploadType,
  User,
} from "@prisma/client"
import sizeOf from "image-size"
import mimeType from "mime-types"
import idgen from "nanoid"
import { PrismaService } from "../prisma/prisma.service"
import { MediaProcessorService } from "../media/media-processor.service"
import { S3Service } from "../s3/s3.service"

export class UploadError extends Error {
  constructor(message: string, public status: number = 400) {
    super(message)
    Object.setPrototypeOf(this, UploadError.prototype)
  }
}

@Injectable()
export class UploaderService {
  /**
   * Defaulting to local uploads for development
   */
  static readonly DEFAULT_UPLOAD_DESTINATION: UploadDestination =
    UploadDestination.Local

  static readonly LOCAL_UPLOAD_PATH = "_images"

  private readonly logger = new Logger(UploaderService.name)

  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
    private s3: S3Service,
    private mediaProcessor: MediaProcessorService,
  ) {}

  async uploadMedia(opts: UploadOptions): Promise<Image> {
    const {
      id: ireneBotImageId,
      idolId: ireneBotIdolId,
      idolName: ireneBotIdolName,
    } = opts.irene || {}
    if (ireneBotImageId) {
      const existingImage = await this.prisma.image.findUnique({
        where: { ireneBotId: Number(ireneBotImageId) },
        select: { id: true },
      })
      if (existingImage) {
        throw new UploadError(
          `Image with irene id ${ireneBotImageId} already exists`,
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
    const inputFormat = MediaProcessorService.parseExtension(metadata.type)

    if (inputFormat.type === "error") {
      throw new UploadError("Invalid file type")
    }

    const webp = await this.mediaProcessor.convertImage(
      opts.buffer,
      inputFormat.mimeType,
    )

    const { format, height, width } = webp.info

    const buffer = webp.data
    const slug = idgen.nanoid(16)
    const slugWithExtension = `${slug}.${format}`

    if (!format) {
      throw new UploadError(`Invalid file format`)
    }

    const mime = mimeType.lookup(format, "invalid")

    if (mime === "invalid") {
      throw new UploadError("invalid file type")
    }
    const [hash, uploadResult] = await Promise.all([
      MediaProcessorService.sha256Hash(buffer),
      this.s3.putImage({
        key: slugWithExtension,
        body: buffer,
        mimetype: mime || "media/webp",
      }),
    ])
    const status = uploadResult?.$metadata.httpStatusCode
    if (status && status >= 500) {
      console.log(uploadResult.$metadata)
      throw new UploadError(`Failed to upload image`, 500)
    }
    const databaseType = mimetypeMappings[format]
    if (!databaseType) {
      throw new UploadError(`unsupported type '${format}'`)
    }
    if (!width || !height) {
      throw new UploadError(`Could not determine the dimensions of the image`)
    }
    const image = await this.prisma.image.create({
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
      },
    })
    let existingPerson: Person | undefined | null = ireneBotIdolId
      ? await this.prisma.person.findUnique({
          where: { ireneBotId: Number(ireneBotIdolId) },
        })
      : undefined

    if (!existingPerson && opts.personId !== undefined) {
      existingPerson = await this.prisma.person.findUnique({
        where: { id: opts.personId },
      })
    }

    // create a person if given an irene bot entry and a person for it doesn't exist yet
    if (ireneBotIdolName && !existingPerson) {
      existingPerson = await this.prisma.person.create({
        data: {
          ireneBotId: ireneBotIdolId ? Number(ireneBotIdolId) : undefined,
          name: ireneBotIdolName,
        },
      })
    }

    if (existingPerson) {
      await this.prisma.appearance.create({
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
    // wendy.fullLabel(image.slug).catch((err) => {
    //   console.error("Something went wrong trying to label an uploaded media")
    //   console.error(err)
    // })

    // siteEvent.image.upload$.next(image)

    return image
  }

  mediaUrl(media: Image) {
    const destination: UploadDestination =
      this.config.get("UPLOAD_DESTINATION") ??
      UploaderService.DEFAULT_UPLOAD_DESTINATION
    let base: string
    if (media.destination === UploadDestination.S3) {
      const baseUrl = this.config.get<string>("S3_BASE_URL")
      if (!baseUrl) {
        throw Error(
          "UPLOAD_DESTINATION was set to S3 but S3_BASE_URL was not set",
        )
      }
      base = baseUrl
    } else if (media.destination === UploadDestination.Local) {
      const port = this.config.get<string>("PORT")
      if (!port) {
        this.logger.warn(
          `UPLOAD_DESTINATION was set to Local but PORT was not set, defaulting to port 5000`,
        )
      }
      // hardcoding the host for now because we don't use local uploads in production
      const baseUrl = `http://localhost:${port ?? "5000"}`
      base = `${baseUrl}/${UploaderService.LOCAL_UPLOAD_PATH}`
    } else {
      throw new Error(`Unknown upload destination: ${destination}`)
    }
    const imageKey = `${media.slug}.${media.mimetype.toLowerCase()}`
    return `${base}/${imageKey}`
  }
}

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
  personId?: number
  irene?: IreneBotUploadOptions
}

export const mimetypeMappings: Record<string, MimeType> = {
  jpg: "JPG",
  jpeg: "JPG",
  png: "PNG",
  gif: "GIF",
  webm: "WEBM",
  webp: "WEBP",
  avif: "AVIF",
  mp4: "MP4",
}
