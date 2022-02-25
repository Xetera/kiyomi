import { Injectable } from "@nestjs/common"
import { GroupMember } from "@prisma/client"
import { PrismaService } from "../prisma/prisma.service"

@Injectable()
export class GroupMemberService {
  constructor(private prisma: PrismaService) {
  }

  findById(id: number): Promise<GroupMember | null> {
    return this.prisma.groupMember.findUnique({
      where: {
        id,
      },
    })
  }
}
