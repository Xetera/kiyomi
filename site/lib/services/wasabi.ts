import { S3 } from "@aws-sdk/client-s3"

export type UploadableImage = {
  // if uploading through an image
  fileName?: string
  key: string
  body: Buffer
  mimetype: string
}

export function makeWasabi() {
  const config = {
    bucketName: process.env.WASABI_BUCKET_NAME!,
    region: "eu-east-1",
    accessKeyId: process.env.WASABI_ACCESS_KEY!,
    secretAccessKey: process.env.WASABI_SECRET!,
  }

  const wasabi = new S3({
    endpoint: "https://s3.wasabisys.com",
    credentials: config,
  })

  const methods = {
    putImage(image: UploadableImage) {
      const UPLOAD_CONFIG = {
        Bucket: config.bucketName,
      }
      return wasabi.putObject({
        ...UPLOAD_CONFIG,
        Key: image.key,
        Body: image.body,
        ContentType: image.mimetype,
      })
    },
  }
  return methods
}

export type WasabiService = ReturnType<typeof makeWasabi>
