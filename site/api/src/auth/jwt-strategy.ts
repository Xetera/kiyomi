import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {ConfigService} from "@nestjs/config";
import {Prisma, User as UserModel} from '@prisma/client';
import {JwtDto} from "./dto/jwt.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
        readonly configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_ACCESS_SECRET'),
        });
    }

    async validate(payload: JwtDto): Promise<UserModel> {
        const user = await this.authService.validateUser(payload.userId);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}