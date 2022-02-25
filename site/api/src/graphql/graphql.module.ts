import { Module } from '@nestjs/common';
import { MediaModule } from '../media/media.module';
import { GraphqlController } from './graphql.controller';
import { GraphqlService } from './graphql.service';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [MediaModule, TagModule],
  controllers: [GraphqlController],
  providers: [GraphqlService],
})
export class GraphqlModule {}
