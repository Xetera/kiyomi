import { S3, Endpoint } from "aws-sdk";
import { FileDetails } from "./file";

const config = {
  bucketName: "my.simp.pics",
  region: "eu-east-1",
  accessKeyId: process.env.WASABI_ACCESS_KEY!,
  secretAccessKey: process.env.WASABI_SECRET!,
};

export const wasabi = new S3({
  endpoint: new Endpoint("s3.wasabisys.com"),
  credentials: config,
  s3ForcePathStyle: true,
});

export type UploadableFile = FileDetails & {
  path: string;
  mimetype: string;
};

const UPLOAD_CONFIG = {
  Bucket: config.bucketName,
};

export function uploadParsedFiles([file]: UploadableFile[]) {
  return wasabi
    .putObject({
      ...UPLOAD_CONFIG,
      Key: file.path,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
    .promise();
}