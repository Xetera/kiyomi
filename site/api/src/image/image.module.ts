import { Module } from "@nestjs/common"
import { ImageController } from "./image.controller"
import { ImageService } from "./image.service"
import { PrismaModule } from "../prisma/prisma.module"

@Module({
  imports: [PrismaModule],
  controllers: [ImageController],
  providers: [ImageService],
  exports: [ImageService]
})
export class ImageModule {
}