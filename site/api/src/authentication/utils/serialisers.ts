import { Injectable } from "@nestjs/common"
import { User } from "@prisma/client"
import { Done } from "../../utils/types"
import { PassportSerializer } from "@nestjs/passport"
import { AuthenticationService } from "../authentication.service"

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthenticationService) {
    super()
  }

  serializeUser(user: User, done: Done<number>) {
    done(undefined, user.id)
  }

  async deserializeUser(userId: number, done: Done<User>) {
    const userDB = await this.authService.findUser(userId)
    if (userDB) {
      done(undefined, userDB)
    } else {
      done(new Error("Invalid User"), undefined)
    }
  }
}
