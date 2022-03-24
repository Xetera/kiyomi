import { Injectable, Logger } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { Image, Prisma } from "@prisma/client"
import { ConfigService } from "@nestjs/config"
import { UploaderService } from "../uploader/uploader.service"
import { PaginationArgs } from "../common-dto/pagination.args"
import { points } from "@turf/helpers"
import centroid from "@turf/centroid"
import { Cursor, GraphqlService } from "../graphql/graphql.service"
import { HomepageModel } from "./models/homepage.model"

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
        createdAt: "desc",
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

  async homepage(cursor: string): Promise<HomepageModel> {
    const PER_PAGE = 50
    const id = GraphqlService.fromCursor(cursor)
    const opts: Prisma.ImageFindManyArgs = {
      ...GraphqlService.baseCursor(PER_PAGE, id),
      orderBy: { id: "desc" },
    }
    const media = await this.prisma.image.findMany(opts)
    const nextCursor = GraphqlService.deriveCursor(media, Cursor.Homepage)

    return {
      cursor: nextCursor,
      media,
    }
  }

  async focus(media: Image): Promise<MediaCoordinateModel> {
    const faces = await this.prisma.image
      .findUnique({ where: { id: media.id } })
      .faces()
    if (faces.length === 0) {
      return {
        x: Math.floor(media.width / 2),
        y: Math.floor(media.height / 2),
      }
    }
    // TODO: focus only one face if faces in the image are too far apart relative to the size of the image
    try {
      const coordinates = points(
        faces.map((f) => [
          Math.floor(f.x + f.width / 2),
          Math.floor(f.y + f.height / 2),
        ]),
      )
      const polygon = centroid(coordinates)
      const [x, y] = polygon.geometry.coordinates
      if (!x || !y) {
        return {
          x: Math.floor(media.width / 2),
          y: Math.floor(media.height / 2),
        }
      }
      return { x: Math.floor(x), y: Math.floor(y) }
    } catch (err) {
      this.logger.error(err)
      this.logger.log(faces)
      throw err
    }
  }
}
