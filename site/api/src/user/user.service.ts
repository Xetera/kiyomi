import { Injectable } from "@nestjs/common"
import { User } from "@prisma/client"
import { PrismaService } from "../prisma/prisma.service"

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {
  }

  getById(userId: number): Promise<User | null> {
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
