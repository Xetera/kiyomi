import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import {PrismaService} from "../prisma.service";
import {ImageService} from "./image.service";

@Module({
  controllers: [ImageController],
  providers: [ImageService, PrismaService]
})
export class ImageModule {}
