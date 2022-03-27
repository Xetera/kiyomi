import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { Prisma, Role, User, User as UserModel } from "@prisma/client"
import { UserDetails } from "../utils/types"
import { Profile } from "passport-discord"
import { RoleKind } from "./role"

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
            image: this.discordAvatar(details),
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
    return await this.prismaService.user.findFirst({
      where: { id },
      include: { roles: true },
    })
  }

  discordAvatar(profile: UserDetails): string {
    return `https://cdn.discordapp.com/avatars/${profile.discordId}/${profile.avatar}`
  }

  async updateUserDiscordCredentials(id: number, profile: UserDetails) {
    return this.prismaService.user.update({
      where: { id },
      data: {
        image: this.discordAvatar(profile),
      },
    })
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

  async userFromToken(token: string) {
    return this.prismaService.user.findUnique({
      where: { token },
      include: { roles: true },
    })
  }

  hasAllRoles(user: { roles: Role[] }, roles: RoleKind[]): boolean {
    // TODO: optimize? eh
    return roles.every((role) =>
      user.roles.some((userRole) => userRole.name === role),
    )
  }
}
