import { Injectable, Logger } from "@nestjs/common"
import { Image } from "@prisma/client"
import { ImgProxy } from "./imgproxy"
import { MediaThumbnailModel, MediaThumbnailModelWidths } from "../media/models"
import { ConfigService } from "@nestjs/config"
import { MediaService } from "../media/media.service"
import { UploaderService } from "../uploader/uploader.service";

@Injectable()
export class ImgProxyService {
  readonly imgproxy: ImgProxy
  readonly enabled: boolean
  readonly logger = new Logger(ImgProxyService.name)

  constructor(
    private config: ConfigService,
    private uploaderService: UploaderService,
  ) {
    const key = config.get("IMGPROXY_KEY")
    const salt = config.get("IMGPROXY_SALT")
    const url = config.get("IMGPROXY_URL")
    this.enabled = key && salt && url
    if (!this.enabled) {
      this.logger.warn(
        `Imgproxy is disabled because it's missing required configuration.`,
      )
    }
    this.imgproxy = new ImgProxy({ key, salt, url })
  }

  /**
   * Generates a thumbnail for the given media
   * IMPORTANT: the imageproxy client must not have an expiry set
   * as these thumbnails are cached in the search engine for a later date
   * @param img
   */
  thumbnails(img: Image): MediaThumbnailModel {
    const rootImage = this.uploaderService.mediaUrl(img)
    // we can't really do resizing for MP4s so this is
    // a decent alternative
    if (img.mimetype === "MP4" || !this.enabled) {
      return {
        xsmall: rootImage,
        small: rootImage,
        medium: rootImage,
        large: rootImage,
        full: rootImage,
      }
    }

    let base = this.imgproxy
      .image(rootImage)
      .resizeType("fill")
      .extension("webp")
    const aspectRatio = img.width / img.height

    // We want to scale by width if the image is wider than it is tall
    if (aspectRatio > 1) {
      base = base.height(0)
    } else {
      base = base.width(0)
    }

    return Object.keys(MediaThumbnailModelWidths).reduce((acc, key) => {
      if (aspectRatio > 1) {
        acc[key] = base.width(MediaThumbnailModelWidths[key]).get()
      } else {
        acc[key] = base.height(MediaThumbnailModelWidths[key]).get()
      }
      return acc
    }, {} as MediaThumbnailModel)
  }
}
