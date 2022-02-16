import {Controller, Post, Query} from '@nestjs/common';
import { ImageService } from './image.service';
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  async downloadImage(
      @Query('slug') slug: string,
      @Query('discoveredImageId') discoveredImageId: string) {
    return this.imageService.downloadImage(slug, discoveredImageId);
  }

}
