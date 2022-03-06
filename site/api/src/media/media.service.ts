import { Injectable, Logger } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { Image, Prisma } from "@prisma/client"
import { ConfigService } from "@nestjs/config"
import { UploaderService } from "../uploader/uploader.service"
import { PaginationArgs } from "../common-dto/pagination.args"

@Injectable()
export class MediaService {
  private readonly logger = new Logger(UploaderService.name)

  constructor(private config: ConfigService, private prisma: PrismaService) {}

  tags(imageId: number, pagination?: PaginationArgs) {
    return this.prisma.imageTag.findMany({
      where: { imageId },
      skip: pagination?.skip,
      take: pagination?.take,
    })
  }

  findBySlug(slug: string): Promise<Image | null> {
    return this.prisma.image.findUnique({
      where: { slug },
    })
  }

  findById(id: number): Promise<Image | null> {
    return this.prisma.image.findUnique({
      where: { id },
    })
  }

  reports(cursor?: number) {
    const perPage = 30
    const opts: Prisma.ImageReportFindManyArgs = {
      where: {
        action: null,
      },
      take: perPage,
      orderBy: {
        createdAt: "desc"
      },
    }
    if (cursor !== undefined) {
      opts.skip = 1
      opts.cursor = {
        id: cursor,
      }
    }
    return this.prisma.imageReport.findMany(opts)
  }
}
