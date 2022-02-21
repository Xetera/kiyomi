import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { Tag } from "@prisma/client"

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {
  }

  async aliases(tagId: number) {
    return this.prisma.tagAlias.findMany({ where: { tagId } })
  }

  async tagByImageTagId(imageTagId: number): Promise<Tag | undefined> {
    const { tag } = await this.prisma.imageTag.findUnique({
      where: { id: imageTagId },
      include: { tag: true },
    })
    console.log({ tag })
    return tag
  }
}
