import { Readable } from "stream";
import { imageHash as imageHashCallback } from "image-hash";
import multer from "multer";
import { NextApiRequest } from "next";
import { promisify } from "util";
import { createHash } from "crypto";
import { MimeType } from "@prisma/client";
import getColors from "get-image-colors";

// const thief = new Thief();

const imageHash = promisify(imageHashCallback);

const upload = multer({ storage: multer.memoryStorage() });

export type ImageMetadata = { width: number; height: number; type: string };

export type FileDetails = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};

export type FormData = {
  fields: Record<string, string>;
  files: FileDetails[];
};

export function parseFiles(
  req: NextApiRequest,
  { name = "file" } = {}
): Promise<FormData> {
  return new Promise(function (resolve, reject) {
    upload.array(name)(req as any, null, (err: any) => {
      if (err) {
        return reject(err);
      }
      return resolve({
        // @ts-ignore
        files: req.files,
        // @ts-ignore
        fields: req.body,
      });
    });
  });
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
};

export function sha256Hash(buff: Buffer) {
  return new Promise((res, rej) => {
    const hash = createHash("sha256");
    hash.write(buff, "utf-8", (err) => {
      if (err) {
        return rej(err);
      }
      return res(hash.digest("hex"));
    });
  });
}

const supportedPHashMimetypes = new Set(["jpeg", "png", "jpg"]);

export function canPerceptualHash(mimetype: string): boolean {
  return supportedPHashMimetypes.has(mimetype);
}

export function perceptualHash(data: Buffer, mimetype: string) {
  const HASH_BIT_SIZE = 32;
  const USE_PRECISE_HASH = true;
  return imageHash(
    { data, ext: mimetype, encoding: "utf-8" },
    HASH_BIT_SIZE,
    USE_PRECISE_HASH
  );
}

export async function dominantColors(
  data: Buffer,
  type: string
): Promise<number[]> {
  const colors = await getColors(data, { type, count: 5 });
  return colors.map((color: any) => color.num());
}
