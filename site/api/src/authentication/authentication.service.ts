import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { Prisma, User, User as UserModel } from "@prisma/client"
import { UserDetails } from "../utils/types"
import { AuthenticationProvider } from "./auth"

@Injectable()
export class AuthenticationService {
  constructor(private readonly prismaService: PrismaService) {}

  async validateUser(details: UserDetails): Promise<User> {
    const payload = {
      refreshToken: details.refreshToken,
      accessToken: details.accessToken,
      providerUserId: details.discordId,
      providerType: "discord",
    }

    const result = await this.prismaService.userAccount.upsert({
      include: { user: true },
      where: {
        providerIdentity: {
          providerType: "discord",
          providerUserId: details.discordId,
        },
      },
      update: payload,
      create: {
        ...payload,
        user: {
          create: {
            name: details.username,
            bot: false,
            // Discord just figures avatars out if you don't supply an extension
            image: `https://cdn.discordapp.com/avatars/${details.discordId}/${details.avatar}`,
          },
        },
      },
    })
    return result.user
  }

  async createUser(details: UserDetails) {
    return await this.prismaService.user.create({
      data: {},
    })
  }

  async findUser(id: number): Promise<User | null> {
    return await this.prismaService.user.findFirst({ where: { id } })
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput
    data: Prisma.UserUpdateInput
  }): Promise<UserModel> {
    const { where, data } = params
    return this.prismaService.user.update({
      data,
      where,
    })
  }
}
