import {Module} from '@nestjs/common';
import {HttpModule} from '@nestjs/axios';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import { ImageModule } from './image/image.module';
import { AuthenticationModule } from './authentication/authentication.module';
import {PassportModule} from "@nestjs/passport";
import {ConfigService} from "@nestjs/config";

@Module({
  imports: [
    AuthenticationModule,
    ImageModule,
    PassportModule.register({ session: true }),
    HttpModule
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {

}