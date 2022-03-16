import { Module } from "@nestjs/common"
import { AuthenticationService } from "./authentication.service"
import { DiscordStrategy } from "./discord-strategy"
import { AuthenticationController } from "./authentication.controller"
import { PrismaModule } from "../prisma/prisma.module"
import { PassportModule } from "@nestjs/passport"
import { ConfigModule } from "@nestjs/config"
import { SessionSerializer } from "./utils/serialisers";

@Module({
  controllers: [AuthenticationController],
  imports: [PrismaModule, PassportModule, ConfigModule],
  providers: [AuthenticationService, SessionSerializer, DiscordStrategy],
  exports: [],
})
export class AuthenticationModule {}
