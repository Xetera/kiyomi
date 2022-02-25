import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { PaginationArgs } from "../common-dto/pagination.args";

@Injectable()
export class AppearanceService {
  constructor(private prisma: PrismaService) {}

  appearanceTags(appearanceId: number) {
    return this.prisma.appearanceTag.findMany({ where: { appearanceId } })
  }

  async appearancePerson(appearanceId: number) {
    const appearance = await this.prisma.appearance.findUnique({
      where: { id: appearanceId },
      include: { person: true },
    })
    if (!appearance) {
      return
    }
    return appearance.person
  }

  async appearanceTagAppearance(appearanceTagId: number) {
    const appearanceTag = await this.prisma.appearanceTag.findUnique({
      where: { id: appearanceTagId },
      include: { appearance: true },
    })
    if (!appearanceTag) {
      return
    }
    return appearanceTag.appearance
  }

  async imageAppearances(imageId: number, pagination?: PaginationArgs) {
    return this.prisma.appearance.findMany({
      where: { imageId },
      take: pagination?.take,
      skip: pagination?.skip,
    })
  }
}
