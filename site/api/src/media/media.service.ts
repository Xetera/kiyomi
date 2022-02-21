import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { ImageTag } from "@prisma/client"

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) {
  }

  tags(imageId: number) {
    return this.prisma.imageTag.findMany({
      where: { imageId },
    })
  }

  findBySlug(slug: string) {
    return this.prisma.image.findUnique({
      where: { slug },
    })
  }
}
