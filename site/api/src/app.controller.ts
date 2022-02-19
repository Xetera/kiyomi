import {Controller, Request, Get, Post, UseGuards} from '@nestjs/common';
import { AppService } from './app.service';
import {ApiTags} from "@nestjs/swagger";
import {LocalAuthGuard} from "./auth/local-auth.guard";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('Health Check')
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
}