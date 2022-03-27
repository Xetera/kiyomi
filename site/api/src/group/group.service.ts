import { Injectable } from "@nestjs/common"
import { Group, GroupAlias, GroupMember, Hiatus, Image } from "@prisma/client"
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

  private static isHiatusOngoing(date: Date, hiatus: Hiatus): boolean {
    const isOngoingHiatus = hiatus.startDate < date && !hiatus.endDate

    const isInPlannedHiatus = Boolean(
      hiatus.startDate < date && hiatus.endDate && hiatus.endDate > date,
    )

    return isOngoingHiatus || isInPlannedHiatus
  }

  /**
   * The current status for a group. Undefined if the status cannot be known.
   * @param group
   */
  async status(group: Group): Promise<GroupStatusModel | undefined> {
    const now = new Date()

    if (group.disbandDate && group.disbandDate < now) {
      return GroupStatusModel.DISBANDED
    }

    if (group.debutDate && group.debutDate > now) {
      return GroupStatusModel.PRE_DEBUT
    }

    const hiatuses = await this.prisma.hiatus.findMany({
      where: { groupId: group.id },
    })

    if (hiatuses.length > 0) {
      const hasOngoingHiatus = hiatuses.some(
        GroupService.isHiatusOngoing.bind(undefined, now),
      )

      if (hasOngoingHiatus) {
        return GroupStatusModel.HIATUS
      }
    }

    // group.creationDate only exists for documentation purposes
    // and does not affect the group status in any way
    if (!group.debutDate && !group.disbandDate) {
      return
    }

    return GroupStatusModel.ACTIVE
  }
}
