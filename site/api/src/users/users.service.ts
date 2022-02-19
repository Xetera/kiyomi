import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {PasswordService} from "../auth/passwordService";
import {ChangePasswordInput} from "./dto/change-password.input";


@Injectable()
export class UsersService {
    constructor(
        private prismaService: PrismaService,
        private passwordService: PasswordService) {
        prismaService.$use(async (params, next) => {
            const before = Date.now()
            const result = await next(params)
            const after = Date.now()
            console.log(`Query ${params.model}.${params.action} took ${after - before}ms`)
            return result
        })
        // @ts-ignore
        prismaService.$on('query', e => {
            // @ts-ignore
            console.log("Query: " + e.query)
            // @ts-ignore
            console.log("Duration: " + e.duration + "ms")
        })

    }
    // updateUser(userId: string, newUserData: UpdateUserInput) {
    //     return this.prismaService.user.update({
    //         data: newUserData,
    //         where: {
    //             id: userId,
    //         },
    //     });
    // }

    // async changePassword(
    //     userId: string,
    //     userPassword: string,
    //     changePassword: ChangePasswordInput
    // ) {
    //     const passwordValid = await this.passwordService.validatePassword(
    //         changePassword.oldPassword,
    //         userPassword
    //     );
    //
    //     if (!passwordValid) {
    //         throw new BadRequestException('Invalid password');
    //     }
    //
    //     const hashedPassword = await this.passwordService.hashPassword(
    //         changePassword.newPassword
    //     );
    //
    //     return this.prismaService.user.update({
    //         data: {
    //             password: hashedPassword,
    //         },
    //         where: { id: userId },
    //     });
    // }
}