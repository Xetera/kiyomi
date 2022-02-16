import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import { ImageModule } from './image/image.module';
import {ImageController} from "./image/image.controller";

@Module({
  imports: [ImageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}