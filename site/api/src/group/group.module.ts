import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { PrismaModule } from "../prisma/prisma.module";
import { GroupResolver } from "./group.resolver";

@Module({
  providers: [GroupService, GroupResolver],
  exports: [GroupService]
})
export class GroupModule {}
