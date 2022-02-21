import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaResolver } from "./media.resolver";
import { TagModule } from "../tag/tag.module";
import { MediaTagResolver } from "./media-tag.resolver";
import { UserModule } from "../user/user.module";
import { AppearanceModule } from "../appearance/appearance.module";

@Module({
  imports: [TagModule, UserModule, AppearanceModule],
  providers: [MediaService, MediaResolver, MediaTagResolver],
  exports: [MediaService]
})
export class MediaModule {}
