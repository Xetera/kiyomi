import * as crypto from "node:crypto"

export type ImgProxyOptions = {
  key: string; salt: string; url: string
}

export class ImgProxy {
  static DEFAULT_SETTINGS = {
    enlarge: 1,
    width: 1000,
    height: 1000,
    gravity: "ce",
    resizeType: "fill",
    extension: "webp",
    originalImage: undefined,
  }
  options: {
    config: ImgProxyOptions
    settings: typeof ImgProxy.DEFAULT_SETTINGS
  }

  constructor({ key, salt, url }: ImgProxyOptions) {
    this.options = {
      config: { key, salt, url },
      settings: { ...ImgProxy.DEFAULT_SETTINGS },
    }
  }

  setOption(option: string, value: any): void {
    this.options.settings[option] = value
  }

  image(val: string): this {
    this.setOption("originalImage", val)
    return this
  }

  width(val: number): this {
    this.setOption("width", val)
    return this
  }

  height(val: number): this {
    this.setOption("height", val)
    return this
  }

  gravity(val: number): this {
    this.setOption("gravity", val)
    return this
  }

  enlarge(val: boolean): this {
    this.setOption("enlarge", val)
    return this
  }

  resizeType(val: string): this {
    this.setOption("resizeType", val)
    return this
  }

  extension(val: string): this {
    this.setOption("extension", val)
    return this
  }

  sign(target: string): string {
    const hexKey = ImgProxy.hexDecode(this.options.config.key)
    const hexSalt = ImgProxy.hexDecode(this.options.config.salt)

    const hmac = crypto.createHmac("sha256", hexKey)
    hmac.update(hexSalt)
    hmac.update(target)
    return ImgProxy.urlSafeBase64(hmac.digest())
  }

  private static hexDecode(hex: string): Buffer {
    return Buffer.from(hex, "hex")
  }

  static urlSafeBase64(string: Buffer): string {
    return Buffer.from(string)
      .toString("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
  }

  get(): string {
    const settings = this.options.settings
    const config = this.options.config

    if (!settings.originalImage) {
      throw new Error(`Missing required param: image`)
    }

    const encoded_url = ImgProxy.urlSafeBase64(settings.originalImage)
    const path = `/resize:${settings.resizeType}:${settings.width}:${settings.height}:${settings.enlarge}/gravity:${settings.gravity}/${encoded_url}.${settings.extension}`
    return `${config.url}/${this.sign(path)}${path}`
  }
}
