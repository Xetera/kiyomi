import { handle, withFileUpload, withUser } from "@/lib/middleware";
import {
  canPerceptualHash,
  dominantColors,
  mimetypeMappings,
  perceptualHash,
  sha256Hash,
} from "@/lib/file";
import { uploadParsedFiles } from "@/lib/wasabi";
import mimeType from "mime-types";
import sizeOf from "image-size";
import {
  canDetectFaces,
  detectFaces,
  FaceDetect,
} from "@/lib/face-recognition";
import idgen from "nanoid";
import { transformImage } from "@/lib/utils/transformer";
import { humanFileSize } from "@/lib/utils/shared";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handle(
  withUser(
    withFileUpload(async (_req, res, { upload, db, user, contextType }) => {
      try {
        const { files, fields } = upload;
        const [file] = files;

        const tags = fields.tags ? fields.tags.split(",") : [];
        const isPublic = fields?.public === "true" ?? false;
        const nsfw = fields?.nsfw === "true" ?? false;

        if (!file) {
          return res.status(400).json({ error: "'file' missing" });
        }

        const metadata = sizeOf(file.buffer);

        const slug = idgen.nanoid(16);
        const slugWithExtension = `${slug}.${metadata.type}`;

        const mime = mimeType.lookup(metadata.type);

        const [pHash, hash, faces, palette] = await Promise.all([
          mime !== false && canPerceptualHash(metadata.type)
            ? perceptualHash(file.buffer, mime)
            : Promise.resolve(),
          sha256Hash(file.buffer),
          mime !== false && canDetectFaces(metadata.type)
            ? detectFaces(file.buffer, {
                width: metadata.width,
                height: metadata.height,
              }).catch((err) => {
                console.log("something went wrong with detecting faces", err);
                return [] as FaceDetect[];
              })
            : Promise.resolve([] as FaceDetect[]),
          dominantColors(file.buffer, file.mimetype).catch((err) => {
            console.log(err);
          }),
          uploadParsedFiles([
            {
              ...file,
              path: slugWithExtension,
            },
          ]),
        ]);

        const facesDims = faces.map(({ detection }) => ({
          score: detection.score,
          x: detection.box.x,
          y: detection.box.y,
          width: detection.box.width,
          height: detection.box.height,
        }));

        const databaseType = mimetypeMappings[metadata.type];

        if (!databaseType) {
          return res
            .status(400)
            .json({ error: `unsupported type '${metadata.type}'` });
        }

        const image = await db.image.create({
          data: {
            fileName: file.originalname,
            width: metadata.width,
            height: metadata.height,
            uploadType: contextType,
            mimetype: databaseType,
            pHash: pHash as string | undefined,
            hash: hash as string,
            public: isPublic,
            bytes: file.size,
            isNsfw: nsfw,
            slug,
            ...(palette
              ? {
                  palette,
                }
              : {}),
            user: {
              connect: { email: user.email },
            },
            tags: {
              create: tags.map((tag) => {
                return {
                  source: "USER",
                  name: tag,
                  addedBy: {
                    connect: {
                      email: user.email,
                    },
                  },
                };
              }),
            },
            faces: {
              create: faces.map(({ detection, descriptor }) => {
                return {
                  descriptor: Array.from(descriptor),
                  x: detection.box.x,
                  y: detection.box.y,
                  width: detection.box.width,
                  height: detection.box.height,
                };
              }),
            },
          },
        });

        console.log(facesDims);

        res.json({
          ...transformImage(image),
          bytesHuman: humanFileSize(file.size),
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    })
  )
);
