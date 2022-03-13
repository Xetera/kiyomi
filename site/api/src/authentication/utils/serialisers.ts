import {Inject, Injectable} from "@nestjs/common";
import {UserModel} from "../../user/models/user.model";
import {Done} from "../../utils/types";
import {PassportSerializer} from "@nestjs/passport";
import {AuthenticationService} from "../authentication.service";


@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(
      @Inject("AUTH_SERVICE")
      private readonly authService: AuthenticationService,
    ) {
        super()
    }


    serializeUser(user: UserModel, done: Done) {
        done(null, user);
    }

    async deserializeUser(user: UserModel, done: Done) {
        const userDB = await this.authService.findUser({id: user.id});
        return userDB ? done(null, userDB) : done(null, null);
    }
}