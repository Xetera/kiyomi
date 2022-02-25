import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {
  }

  getById(userId: number) {
    return this.prisma.user.findUnique({
      where: {
        id: userId
      }
    })
  }

  roles(userId: number) {
    return this.prisma.role.findMany({ where: { userId } })
  }
}
