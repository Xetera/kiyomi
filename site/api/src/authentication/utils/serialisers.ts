import { PassportSerializer } from "@nestjs/passport"
import { Inject, Injectable } from "@nestjs/common"
import { AuthenticationService } from "../authentication.service"
import { Account } from "@prisma/client"
import { Done } from "../../utils/types"

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(
      @Inject("AUTH_SERVICE")
      private readonly authService: AuthenticationService,
    ) {
        super()
    }

    serializeUser(account: Account, done: Done) {
        done(null, account)
    }

    async deserializeUser(account: Account, done: Done) {
        const accountDB = await this.authService.findAccountById({ id: account.id })
        return accountDB
          ? done(null, accountDB)
          : done(new Error("Could not find account for user"), null)
    }
}