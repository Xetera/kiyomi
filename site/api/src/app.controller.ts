import {Controller, Request, Get, Post, UseGuards} from '@nestjs/common';
import { AppService } from './app.service';
import {ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth/auth.service";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private authService: AuthService
  ) {}

  @ApiTags('Health Check')
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user.id, req.user.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}