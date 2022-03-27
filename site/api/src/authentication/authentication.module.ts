import { Module } from "@nestjs/common"
import { AuthenticationService } from "./authentication.service"
import { DiscordStrategy } from "./discord-strategy"
import { AuthenticationController } from "./authentication.controller"
import { PrismaModule } from "../prisma/prisma.module"
import { PassportModule } from "@nestjs/passport"
import { ConfigModule } from "@nestjs/config"
import { SessionSerializer } from "./utils/serialisers"
import { TokenAuthGuard } from "./token-auth.guard"
import { DiscordAuthGuard } from "./discord-auth.guard"

@Module({
  controllers: [AuthenticationController],
  imports: [PrismaModule, PassportModule, ConfigModule],
  providers: [
    AuthenticationService,
    SessionSerializer,
    DiscordStrategy,
    TokenAuthGuard,
    DiscordAuthGuard,
  ],
  exports: [AuthenticationService, TokenAuthGuard, DiscordAuthGuard],
})
export class AuthenticationModule {}
