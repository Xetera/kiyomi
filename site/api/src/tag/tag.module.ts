import { Module } from '@nestjs/common';
import { TagService } from './tag.service';

@Module({
  providers: [TagService],
  exports: [TagService]
})
export class TagModule {}
