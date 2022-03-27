import { forwardRef, Module } from "@nestjs/common"
import { UploaderService } from "./uploader.service"
import { S3Module } from "../s3/s3.module"
import { MediaModule } from "../media/media.module"
import { UploaderController } from "./uploader.controller"
import { AuthenticationModule } from "../authentication/authentication.module"

@Module({
  imports: [S3Module, forwardRef(() => MediaModule), AuthenticationModule],
  providers: [UploaderService],
  exports: [UploaderService],
  controllers: [UploaderController],
})
export class UploaderModule {}
