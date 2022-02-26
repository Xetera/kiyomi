import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {Prisma, User as UserModel} from '@prisma/client';
import {UserDetails} from "../utils/types";
import {AuthenticationProvider} from "./auth";


@Injectable()
export class AuthenticationService implements AuthenticationProvider{
    constructor(private readonly prismaService: PrismaService) {}

    async validateUser(details: UserDetails) {
        const user = await this.prismaService.user.findUnique({ where: { id: Number(details.discordId)} });
        if (user) {
            await this.updateUser({
                where: {
                    token: details.accessToken
                },
                data: {}
            })
        }
        return await this.createUser(details);
    }

    async createUser(details: UserDetails) {
        return await this.prismaService.user.create({
            data: {

            }
        });
    }

    async findUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<UserModel | null> {
        return await this.prismaService.user.findUnique({
            where: userWhereUniqueInput
        });
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<UserModel> {
        const { where, data } = params;
        return this.prismaService.user.update({
            data,
            where,
        });
    }
}