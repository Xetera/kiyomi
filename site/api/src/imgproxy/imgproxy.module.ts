import { Module } from '@nestjs/common';
import { ImgProxyService } from './imgproxy.service';

@Module({
  providers: [ImgProxyService]
})
export class ImgProxyModule {}
