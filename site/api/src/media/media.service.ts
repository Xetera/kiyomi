import { Injectable, Logger } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { Image, UploadDestination } from "@prisma/client"
import { ConfigService } from "@nestjs/config"
import { UploaderService } from "../uploader/uploader.service"
import { PaginationArgs } from "../common-dto/pagination.args"

@Injectable()
export class MediaService {
  private readonly logger = new Logger(UploaderService.name)

  constructor(private config: ConfigService, private prisma: PrismaService) {
  }

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
}
