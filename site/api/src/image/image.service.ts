import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"

@Injectable()
export class ImageService {
  constructor(private readonly prismaService: PrismaService) {
    prismaService.$use(async (params, next) => {
      const before = Date.now()
      const result = await next(params)
      const after = Date.now()
      console.log(
        `Query ${params.model}.${params.action} took ${after - before}ms`,
      )
      return result
    })
    // @ts-ignore
    prismaService.$on("query", (e) => {
      // @ts-ignore
      console.log("Query: " + e.query)
      // @ts-ignore
      console.log("Duration: " + e.duration + "ms")
    })
  }

  async downloadImage(slug: string, discoveredImageId: string) {
    if (!slug && !discoveredImageId) {
      throw new HttpException("Nothing Found", HttpStatus.BAD_REQUEST)
    }
    let imageUrl: string | undefined
    if (discoveredImageId) {
      const id = Number(discoveredImageId)
      const image = await this.prismaService.discoveredImage.findUnique({
        where: { id },
      })
      if (!image) {
        throw new HttpException("No media found", HttpStatus.NOT_FOUND)
      }
      imageUrl = image.url
    } else {
      const image = await this.prismaService.image.findUnique({
        where: {
          slug: slug as string,
        },
      })
      if (!image) {
        throw new HttpException("no media found", HttpStatus.NOT_FOUND)
      }
    }
    return imageUrl
  }
}