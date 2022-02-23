import { Injectable } from "@nestjs/common"
import { Image } from "@prisma/client"
import { Routing } from "../../../client/routing"
import { ImgProxy } from "../../../lib/services/image-proxy"
import { MediaThumbnailModel } from "../media/models";

@Injectable()
export class ImgProxyService {
  readonly imgproxy: ImgProxy

  constructor() {
    this.imgproxy = new ImgProxy({
      key: process.env.IMGPROXY_KEY,
      salt: process.env.IMGPROXY_SALT,
      url: process.env.IMGPROXY_URL,
    })
  }

  /**
   * Generates a thumbnail for the given media
   * IMPORTANT: the imageproxy client must not have an expiry set
   * as these thumbnails are cached in the search engine for a later date
   * @param img
   */
  thumbnails(img: Image): MediaThumbnailModel {
    const rootImage = Routing.toRawImage(img)
    // we can't really do resizing for MP4s so this is
    // a decent alternative
    if (img.mimetype === "MP4") {
      return {
        small: rootImage,
        medium: rootImage,
        large: rootImage,
      }
    }
    const base = this.imgproxy
      .image(rootImage)
      .width(0)
      .resizeType("fill")
      .extension("webp")
    return {
      xsmall: base.height(250).get(),
      small: base.height(350).get(),
      medium: base.height(500).get(),
      large: base.height(900).get(),
    }
  }
}
