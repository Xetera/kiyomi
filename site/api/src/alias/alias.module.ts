import { Module } from '@nestjs/common';
import { AliasService } from './alias.service';

@Module({
  providers: [AliasService]
})
export class AliasModule {}
