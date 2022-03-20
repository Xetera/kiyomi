import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from "@nestjs/swagger";
import { DiscordAuthGuard } from "./authentication/discord-auth.guard";

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
  ) {}

  @ApiTags('Health Check')
  @UseGuards(DiscordAuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(DiscordAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}