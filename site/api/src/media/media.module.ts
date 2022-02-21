import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaResolver } from "./media.resolver";
import { TagModule } from "../tag/tag.module";
import { MediaTagResolver } from "./media-tag.resolver";

@Module({
  imports: [TagModule],
  providers: [MediaService, MediaResolver, MediaTagResolver],
})
export class MediaModule {}
