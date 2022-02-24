import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {Prisma, Account as AccountModel} from '@prisma/client';


@Injectable()
export class AuthenticationService {
    constructor(private readonly prismaService: PrismaService) {}

    async validateAccount(params: {
        where: Prisma.AccountWhereUniqueInput;
        data: Prisma.AccountCreateInput;
    }) : Promise<AccountModel> {
        const { where, data } = params;
        return await this.prismaService.account.upsert({
            where,
            update: {},
            create: data
        });
    }


    async createAccount(data: Prisma.AccountCreateInput): Promise<AccountModel> {
        return await this.prismaService.account.create({
            data
        });
    }


    async findAccountById(accountWhereUniqueInput: Prisma.AccountWhereUniqueInput): Promise<AccountModel | undefined> {
        return await this.prismaService.account.findFirst({
            where: accountWhereUniqueInput
        })
    }
}