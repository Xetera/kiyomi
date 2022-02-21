import { DynamicModule, Global, Module } from "@nestjs/common"
import { PrismaController } from "./prisma.controller"
import { ConfigService } from "../config/config.service";
import { PrismaClient } from "@prisma/client"
import { PrismaService } from "./prisma.service";

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {
}
