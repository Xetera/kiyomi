import { forwardRef, Module } from "@nestjs/common"
import { AppearanceService } from "./appearance.service"
import { AppearanceResolver } from "./appearance.resolver"
import { UserModule } from "../user/user.module"
import { AppearanceTagResolver } from "./appearance-tag.resolver"
import { MediaModule } from "../media/media.module"

@Module({
  imports: [UserModule, forwardRef(() => MediaModule)],
  providers: [AppearanceService, AppearanceResolver, AppearanceTagResolver],
  exports: [AppearanceService],
})
export class AppearanceModule {
}
