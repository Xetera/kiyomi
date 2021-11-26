import multer from "multer"
import { NextApiRequest, NextApiResponse } from "next"
import { promisify } from "util"
import { createHash } from "crypto"
import { MimeType } from "@prisma/client"
import { Readable } from "stream"
import sharp from "sharp"

const upload = multer({ storage: multer.memoryStorage() })

export type ImageMetadata = { width: number; height: number; type: string }

export type FileDetails = {
  fieldname: string
  originalname: string
  encoding: string
  buffer: Buffer
  size: number
}

async function fileFromUrl(url: URL, fieldname: string): Promise<FileDetails> {
  const DEFAULT_MIMETYPE = "?/?"
  const res = await fetch(url.toString()).then()
  const arrayBuffer = await res.arrayBuffer()
  return {
    encoding: "7bit",
    originalname: "",
    fieldname,
    buffer: Buffer.from(arrayBuffer),
    size: arrayBuffer.byteLength,
  }
}

export type FormData = {
  fields: Record<string, string>
  files: FileDetails[]
}

export function parseFiles(
  req: NextApiRequest,
  res: NextApiResponse,
  { name = "file" } = {}
): Promise<FormData> {
  return new Promise(function (resolve, reject) {
    upload.array(name)(req as any, res as any, async (err: any) => {
      if (err) {
        return reject(err)
      }
      // @ts-ignore
      let files = req.files
      // @ts-ignore
      const fields = req.body
      if (!files.length) {
        let url: URL
        try {
          url = new URL(fields[name])
        } catch (_) {
          return reject(new Error("Uploaded file is not valid"))
        }
        const file = await fileFromUrl(url, name)
        files = [file]
      }
      return resolve({
        files,
        fields,
      })
    })
  })
}

export const mimetypeMappings: Record<string, MimeType> = {
  jpg: "JPG",
  jpeg: "JPG",
  png: "PNG",
  gif: "GIF",
  webm: "WEBM",
  webp: "WEBP",
  avif: "AVIF",
  mp4: "MP4",
}

export function sha256Hash(buff: Buffer) {
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

export function parseExtension(extension: string): MimeType {
  // stinky check
  if (extension === "jpeg") {
    return MimeType.JPG
  }
  if (!(extension.toUpperCase() in MimeType)) {
    throw Error(`${extension} is not a valid mimetype`)
  }
  return MimeType[extension.toUpperCase()]
}

type ConversionResult = {
  data: Buffer
  info: sharp.OutputInfo
}

export async function convertImage(
  buffer: Buffer,
  inputFormat: MimeType
): Promise<ConversionResult> {
  const excludedFormats = new Set<MimeType>([
    MimeType.MP4,
    MimeType.GIF,
    MimeType.WEBP,
    MimeType.WEBM,
  ])
  const mappings: Record<MimeType | string, string> = {
    [MimeType.AVIF]: "webp",
    [MimeType.JPG]: "webp",
    [MimeType.PNG]: "webp",
    [MimeType.SVG]: "webp",
    [MimeType.MP4]: "webm",
    [MimeType.WEBM]: "webm",
    [MimeType.GIF]: "webm",
    [MimeType.WEBP]: "webp",
  }
  const readable = new Readable()
  readable._read = () => {}
  readable.push(buffer)
  readable.push(null)

  async function convertWebp(b: Buffer): Promise<ConversionResult> {
    console.log("converting image to webp")
    return withMetadata(sharp(b).webp({ quality: 80 }))
  }

  async function withMetadata(b: sharp.Sharp): Promise<ConversionResult> {
    return new Promise((resolve, reject) => {
      b.toBuffer((err, data, info) => {
        if (err) {
          return reject(err)
        }
        return resolve({ data, info })
      })
    })
  }

  if (excludedFormats.has(inputFormat)) {
    return withMetadata(sharp(buffer))
  }
  return convertWebp(buffer)
}
