import { Injectable } from "@nestjs/common"
import { MimeType } from "@prisma/client"
import { Readable } from "stream"
import ffmpeg from "fluent-ffmpeg"
import sharp from "sharp"
import { createHash } from "crypto"

@Injectable()
export class MediaProcessorService {
  /**
   * Formats excluded from conversion
   */
  readonly excludedFormats = new Set<MimeType>([
    MimeType.MP4,
    MimeType.GIF,
    MimeType.WEBP,
    MimeType.WEBM,
  ])

  constructor() {}

  static parseExtension(extension: string): ParseMimetypeResult {
    // checking because jpeg aliases jpg
    if (extension === "jpeg") {
      return { type: "ok", mimeType: MimeType.JPG }
    }
    const formattedExtension = extension.toUpperCase()
    if (!(formattedExtension in MimeType)) {
      return { type: "error", reason: "invalid" }
    }
    return { type: "ok", mimeType: MimeType[formattedExtension] }
  }

  static async withMetadata(b: sharp.Sharp): Promise<ConversionResult> {
    return new Promise((resolve, reject) => {
      b.toBuffer((err, data, info) => {
        if (err) {
          return reject(err)
        }
        return resolve({ data, info })
      })
    })
  }

  static async convertWebp(b: Buffer): Promise<ConversionResult> {
    return MediaProcessorService.withMetadata(
      sharp(b, { animated: true }).webp({ quality: 100 }),
    )
  }

  /**
   * Perform the conversion between given mimetype to webp / mp4
   *
   * TODO: Move this into a separate service so we don't need to bundle FFMPEG or Sharp
   * @param buffer
   * @param inputFormat
   */
  async convertImage(
    buffer: Buffer,
    inputFormat: MimeType,
  ): Promise<ConversionResult> {
    if (this.excludedFormats.has(inputFormat)) {
      if (inputFormat === "GIF") {
        return new Promise((res, rej) => {
          const passthrough = ffmpeg()
            .input(Readable.from([buffer], { objectMode: false }))
            .inputFormat("gif_pipe")
            .toFormat("mp4")
            .outputOptions(["-movflags +faststart+empty_moov"])
            .on("error", (e) => console.log("something went wrong", e))
            .pipe()
          const chunks: Buffer[] = []
          passthrough.on("data", (chunk: Buffer) => {
            chunks.push(chunk)
          })
          passthrough.on("end", () => {
            const buff = Buffer.concat(chunks)
            ffmpeg()
              .input(Readable.from([buff], { objectMode: false }))
              .ffprobe((err, data) => {
                if (data.streams.length === 0) {
                  return rej(new Error("Invalid stream"))
                }
                const [firstStream] = data.streams
                const width = firstStream!.width!
                const height = firstStream!.height!
                const size = (data.format.size as unknown) as
                  | string
                  | number
                  | undefined
                res({
                  data: buff,
                  info: {
                    width,
                    height,
                    size: size === "N/A" ? 0 : Number(size),
                    format: "mp4",
                  },
                })
              })
          })
        })
      }
      return MediaProcessorService.withMetadata(sharp(buffer))
    }
    return MediaProcessorService.convertWebp(buffer)
  }

  static sha256Hash(buff: Buffer): Promise<string> {
    return new Promise((res, rej) => {
      const hash = createHash("sha256")
      hash.write(buff, "utf-8", (err) => {
        if (err) {
          return rej(err)
        }
        return res(hash.digest("hex"))
      })
    })
  }
}

export type ParseMimetypeResult =
  | { type: "ok"; mimeType: MimeType }
  | { type: "error"; reason: "invalid" }

type ConversionResult = {
  data: Buffer
  info: MinimalOutputInfo
}

type MinimalOutputInfo = {
  format: string
  size: number
  width: number
  height: number
}
