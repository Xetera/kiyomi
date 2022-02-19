import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {Account as AccountModel} from '@prisma/client';


@Injectable()
export class AuthenticationService {
    constructor(private readonly prismaService: PrismaService) {}

    async validateUser(discordId: string) : Promise<AccountModel> {
        const account = await this.prismaService.account.findFirst({
            where: {
                providerAccountId: discordId
            }
        })
        return account
    }
}