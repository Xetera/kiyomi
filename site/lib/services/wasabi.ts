import { PutObjectCommandOutput, S3 } from "@aws-sdk/client-s3"
import * as fs from "fs"
import * as path from "path"

export type UploadableImage = {
  // if uploading through an media
  fileName?: string
  key: string
  body: Buffer
  mimetype: string
}

type WasabiConfig = {
  bucketName: string
  region: string
  accessKeyId: string
  secretAccessKey: string
}

function imageUploadStrategy(): ImageUploadStrategy {
  const allWasabiSettings = [
    process.env.WASABI_BUCKET_NAME,
    process.env.WASABI_ACCESS_KEY,
    process.env.WASABI_SECRET,
  ]
  if (allWasabiSettings.every((setting) => setting !== undefined)) {
    const config = {
      bucketName: process.env.WASABI_BUCKET_NAME!,
      region: "us-east-1",
      accessKeyId: process.env.WASABI_ACCESS_KEY!,
      secretAccessKey: process.env.WASABI_SECRET!,
    }

    // TODO: modularize some of these settings?
    const wasabi = new S3({
      endpoint: "https://s3.wasabisys.com",
      region: config.region,
      credentials: config,
    })
    return {
      type: "s3",
      client: wasabi,
      credentials: config,
    }
  } else if (allWasabiSettings.some((setting) => setting !== undefined)) {
    console.warn(
      `Some S3 config was enabled but not all; falling back to disk persistence. This is likely a mistake`
    )
  }
  return { type: "disk" }
}

export function makeWasabi() {
  const strategy = imageUploadStrategy()
  console.log(`Initializing uploader with strategy: ${strategy.type}`)

  const diskImagePrefix = "public/_images"
  const imagePrefix =
    strategy.type === "disk"
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/${diskImagePrefix}`
      : process.env.NEXT_PUBLIC_BASE_URL_CDN

  const methods = {
    imagePrefix,
    /**
     * Upload an media, returns a put result if S3 is used for uploading
     * @param image
     */
    async putImage(
      image: UploadableImage
    ): Promise<PutObjectCommandOutput | undefined> {
      if (strategy.type === "s3") {
        return await strategy.client.putObject({
          Bucket: strategy.credentials.bucketName,
          Key: image.key,
          Body: image.body,
          ContentType: image.mimetype,
        })
      } else {
        const localPath = path.join(process.cwd(), diskImagePrefix, image.key)
        await fs.promises.writeFile(localPath, image.body)
      }
    },
  }
  return methods
}

type ImageUploadStrategy =
  | { type: "s3"; client: S3; credentials: WasabiConfig }
  | { type: "disk" }

export type WasabiService = ReturnType<typeof makeWasabi>
