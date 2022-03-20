import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common"
import { Request, Response } from "express"
import { AuthenticatedGuard, DiscordAuthGuard } from "./discord-auth.guard"
import { AuthenticationService } from "./authentication.service"

@Controller("auth")
export class AuthenticationController {
  constructor(private auth: AuthenticationService) {}

  @Get("login/discord")
  @UseGuards(DiscordAuthGuard)
  login() {
    return
  }

  @Get("redirect/discord")
  @UseGuards(DiscordAuthGuard)
  redirect(@Res() res: Response) {
    res.redirect("http://localhost:9000/")
  }

  @Get("status")
  @UseGuards(AuthenticatedGuard)
  status(@Req() req: Request) {
    return req.user
  }

  @Get("logout")
  @UseGuards(AuthenticatedGuard)
  logout(@Req() req: Request) {
    req.logOut()
  }
}
