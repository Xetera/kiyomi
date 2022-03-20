import { Injectable } from "@nestjs/common"
import { Group, GroupAlias, GroupMember, Image } from "@prisma/client"
import { PrismaService } from "../prisma/prisma.service"
import { GroupStatusModel } from "./models/group-status.model"

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}

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

  async status(group: Group): Promise<GroupStatusModel | undefined> {
    if (!group.creationDate) {
      return
    }
    const hiatuses = await this.prisma.hiatus.findMany({
      where: { groupId: group.id },
    })
    const ongoingHiatus = hiatuses.find((h) => !h.endDate)
    if (ongoingHiatus) {
      return GroupStatusModel.HIATUS
    }
  }
}
