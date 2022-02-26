import { Strategy } from 'passport-discord';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {AuthenticationService} from "./authentication.service";
import {PrismaService} from "../prisma/prisma.service";
import {Prisma, User as UserModel} from "@prisma/client";

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthenticationService,
        private readonly configService: ConfigService,
        private readonly prismaService: PrismaService,
    ) {
        super({
            clientID: configService.get('DISCORD_CLIENT_ID'),
            clientSecret: configService.get('DISCORD_CLIENT_SECRET'),
            callbackURL: configService.get('DISCORD_CALLBACK_URL'),
            scope: ['identify', 'guilds'],
        });
    }

    async validate(userWhereUniqueInput: Prisma.UserWhereUniqueInput) : Promise<UserModel|null> {
        return await this.prismaService.user.findUnique({where:userWhereUniqueInput})
    }
}