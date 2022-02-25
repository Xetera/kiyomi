import { Module } from '@nestjs/common';
import { AppearanceService } from './appearance.service';
import { AppearanceResolver } from "./appearance.resolver";
import { UserModule } from "../user/user.module";
import { AppearanceTagResolver } from "./appearance-tag.resolver";

@Module({
  imports: [UserModule],
  providers: [AppearanceService, AppearanceResolver, AppearanceTagResolver],
  exports: [AppearanceService],
})
export class AppearanceModule {}
