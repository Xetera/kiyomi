import { Module } from '@nestjs/common';
import { ImgProxyService } from './imgproxy.service';
import { MediaModule } from "../media/media.module";
import { UploaderModule } from "../uploader/uploader.module";

@Module({
  imports: [UploaderModule],
  providers: [ImgProxyService],
  exports: [ImgProxyService],
})
export class ImgProxyModule {}
