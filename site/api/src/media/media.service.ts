import { Injectable, Logger } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { Image, UploadDestination } from "@prisma/client"
import { ConfigService } from "@nestjs/config"
import { UploaderService } from "../uploader/uploader.service"
import { PaginationArgs } from "../common-dto/pagination.args";

@Injectable()
export class MediaService {
  private readonly logger = new Logger(UploaderService.name)

  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
    private uploaderService: UploaderService,
  ) {}

  tags(imageId: number, pagination?: PaginationArgs) {
    return this.prisma.imageTag.findMany({
      where: { imageId },
      skip: pagination?.skip,
      take: pagination?.take
    })
  }

  findBySlug(slug: string) {
    return this.prisma.image.findUnique({
      where: { slug },
    })
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
