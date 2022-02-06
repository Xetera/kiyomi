import { ImageThumbnails } from "@/../shared/search"
import { Routing } from "@/client/routing"
import { Image, PrismaClient } from "@prisma/client"
import createHmac from "create-hmac"

export type ImageProxyOptions = {
  prisma: PrismaClient
}

export const makeImageProxy = ({}: ImageProxyOptions) => {
  const imgproxy = new ImgProxy({
    key: process.env.IMGPROXY_KEY,
    salt: process.env.IMGPROXY_SALT,
    url: process.env.IMGPROXY_URL,
  })
  return {
    client: imgproxy,
    /**
     * Generates a thumbnail for the given image
     * IMPORTANT: the imageproxy client must not have an expiry set
     * as these thumbnails are cached in the search engine for a later date
     * @param img
     */
    thumbnails(img: Image): ImageThumbnails {
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
      const base = imgproxy
        .image(rootImage)
        .width(0)
        .resizeType("fill")
        .extension("webp")
      return {
        small: base.height(350).get(),
        medium: base.height(500).get(),
        large: base.height(900).get(),
      }
    },
  }
}

export type ImageProxyService = ReturnType<typeof makeImageProxy>

/**
 * Shitty copy paste from another library, I didn't write this code don't get mad at me
 */
export class ImgProxy {
  static settings = {
    enlarge: 1,
    width: 1000,
    height: 1000,
    gravity: "ce",
    resizeType: "fill",
    extension: "webp",
    originalImage: undefined,
  }
  options: {
    config: { key: string; salt: string; url: string }
    settings: typeof ImgProxy.settings
  }

  constructor({ key, salt, url }) {
    this.options = {
      config: { key, salt, url },
      settings: { ...ImgProxy.settings },
    }
  }

  setOption(option, value) {
    this.options.settings[option] = value
  }

  image(val) {
    this.setOption("originalImage", val)
    return this
  }

  width(val) {
    this.setOption("width", val)
    return this
  }

  height(val) {
    this.setOption("height", val)
    return this
  }

  gravity(val) {
    this.setOption("gravity", val)
    return this
  }

  enlarge(val) {
    this.setOption("enlarge", val)
    return this
  }

  resizeType(val) {
    this.setOption("resizeType", val)
    return this
  }

  extension(val) {
    this.setOption("extension", val)
    return this
  }

  sign(target) {
    const hexKey = this.hexDecode(this.options.config.key)
    const hexSalt = this.hexDecode(this.options.config.salt)

    const hmac = createHmac("sha256", hexKey)
    hmac.update(hexSalt)
    hmac.update(target)
    return this.urlSafeBase64(hmac.digest())
  }

  hexDecode(hex) {
    return Buffer.from(hex, "hex")
  }

  urlSafeBase64(string) {
    return Buffer.from(string)
      .toString("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
  }

  get() {
    const settings = this.options.settings
    const config = this.options.config

    if (!settings.originalImage) {
      throw `Missing required param: image`
    }

    const encoded_url = this.urlSafeBase64(settings.originalImage)
    const path = `/${settings.resizeType}/${settings.width}/${settings.height}/${settings.gravity}/${settings.enlarge}/${encoded_url}.${settings.extension}`
    return `${config.url}/${this.sign(path)}${path}`
  }
}
