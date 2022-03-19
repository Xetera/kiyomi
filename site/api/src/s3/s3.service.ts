import { Injectable, Logger } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PutObjectCommandOutput, S3 } from "@aws-sdk/client-s3"
import path from "path"
import fs from "fs"

@Injectable()
export class S3Service {
  private readonly strategy: ImageUploadStrategy
  private readonly logger = new Logger(S3Service.name)
  private static readonly DISK_IMAGE_PREFIX = "public/_images"

  readonly imagePrefix: string

  constructor(private config: ConfigService) {
    const bucketName = config.get("WASABI_BUCKET_NAME")
    const accessKeyId = config.get("WASABI_ACCESS_KEY")
    const secretAccessKey = config.get("WASABI_SECRET")

    const allWasabiSettings = [bucketName, accessKeyId, secretAccessKey]
    if (allWasabiSettings.every((setting) => setting !== undefined)) {
      const config = {
        bucketName,
        region: "us-east-1",
        accessKeyId,
        secretAccessKey,
      }

      // TODO: modularize some of these settings?
      const wasabi = new S3({
        endpoint: "https://s3.wasabisys.com",
        region: config.region,
        credentials: config,
      })
      this.strategy = {
        type: "s3",
        client: wasabi,
        credentials: config,
      }
    } else if (allWasabiSettings.some((setting) => setting !== undefined)) {
      this.logger.warn(
        `Some S3 config was enabled but not all; falling back to disk persistence. This is likely a mistake`,
      )
    }
    this.strategy = { type: "disk" }
    this.logger.log(
      `Initializing uploader with strategy: [${this.strategy.type}]`,
    )

    this.imagePrefix =
      this.strategy.type === "disk"
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/${S3Service.DISK_IMAGE_PREFIX}`
        : process.env.NEXT_PUBLIC_BASE_URL_CDN
  }

  async putImage(
    image: UploadableImage,
  ): Promise<PutObjectCommandOutput | undefined> {
    if (this.strategy.type === "s3") {
      return await this.strategy.client.putObject({
        Bucket: this.strategy.credentials.bucketName,
        Key: image.key,
        Body: image.body,
        ContentType: image.mimetype,
      })
    } else {
      const localPath = path.join(
        process.cwd(),
        S3Service.DISK_IMAGE_PREFIX,
        image.key,
      )
      await fs.promises.writeFile(localPath, image.body)
    }
  }
}

type WasabiConfig = {
  readonly bucketName: string
  readonly region: string
  readonly accessKeyId: string
  readonly secretAccessKey: string
}

type ImageUploadStrategy =
  | { type: "s3"; client: S3; credentials: WasabiConfig }
  | { type: "disk" }

export type UploadableImage = {
  // if uploading through an media
  fileName?: string
  key: string
  body: Buffer
  mimetype: string
}
