import { Injectable } from "@nestjs/common"
import { Group, GroupAlias, GroupMember, Image } from "@prisma/client"
import { PrismaService } from "../prisma/prisma.service"

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {
  }

  async findById(id: number): Promise<Group | null> {
    return await this.prisma.group.findUnique({
      where: {
        id,
      },
    })
  }

  async avatar(groupId: number): Promise<Image | null> {
    const group = await this.prisma.group.findUnique({
      where: {
        id: groupId,
      },
      select: {
        avatar: true,
      },
    })
    if (!group?.avatar) {
      return null
    }
    return group.avatar
  }

  async banner(groupId: number): Promise<Image | null> {
    const group = await this.prisma.group.findUnique({
      where: {
        id: groupId,
      },
      select: {
        banner: true,
      },
    })
    if (!group?.banner) {
      return null
    }
    return group.banner
  }

  async groupMembers(groupId: number): Promise<GroupMember[]> {
    return await this.prisma.groupMember.findMany({
      where: {
        groupId,
      },
    })
  }

  async aliases(groupId: number): Promise<GroupAlias[]> {
    return await this.prisma.groupAlias.findMany({
      where: { groupId },
    })
  }
}
