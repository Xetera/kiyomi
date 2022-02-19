import {Injectable, NotFoundException} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {Prisma, User as UserModel} from '@prisma/client';
import {PrismaService} from "../prisma.service";
import {ConfigService} from "@nestjs/config";
import {SecurityConfig} from "../../configs/config.interface";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private prismaService: PrismaService,
        private configService: ConfigService,
        private jwtService: JwtService
    ) {}

    validateUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<UserModel> {
        return this.prismaService.user.findUnique({ where: { id: userWhereUniqueInput.id } });
    }

    async login(email: string, password: string) {
        const user = await this.prismaService.user.findUnique({ where: { email } });

        if (!user) {
            throw new NotFoundException(`No user found for email: ${email}`);
        }

        return this.generateTokens({
            userId: user.id,
        });
    }


    generateTokens(payload: { userId: number }) {
        return {
            accessToken: this.generateAccessToken(payload),
            refreshToken: this.generateRefreshToken(payload),
        };
    }

    private generateAccessToken(payload: { userId: number }): string {
        return this.jwtService.sign(payload);
    }

    private generateRefreshToken(payload: { userId: number }): string {
        const securityConfig = this.configService.get<SecurityConfig>('security');
        return this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: securityConfig.refreshIn,
        });
    }
}