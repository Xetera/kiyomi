import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaResolver } from "./media.resolver";
import { TagModule } from "../tag/tag.module";
import { MediaTagResolver } from "./media-tag.resolver";
import { UserModule } from "../user/user.module";

@Module({
  imports: [TagModule, UserModule],
  providers: [MediaService, MediaResolver, MediaTagResolver],
})
export class MediaModule {}
