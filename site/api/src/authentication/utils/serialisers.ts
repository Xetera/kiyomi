import { PassportSerializer } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import {AuthenticationService} from "../authentication.service";
import {Done} from "../../utils/types";
import {Prisma, User as UserModel} from '@prisma/client';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(
        @Inject('AUTH_SERVICE')
        private readonly authService: AuthenticationService,
    ) {
        super();
    }

    serializeUser(user: UserModel, done: Done) {
        done(null, user);
    }

    async deserializeUser(user: UserModel, done: Done) {
        const userDB = await this.authService.findUser({id: user.id});
        return userDB ? done(null, userDB) : done(null, null);
    }
}