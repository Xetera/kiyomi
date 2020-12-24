import { handle, withFileUpload, withUser } from "@/lib/middleware";
import {
  humanFileSize,
  mimetypeMappings,
  perceptualHash,
  sha256Hash,
} from "@/lib/file";
import { uploadParsedFiles } from "@/lib/wasabi";
import mimeType from "mime-types";
import sizeOf from "image-size";
import { detectFaces, FaceDetect } from "@/lib/face-recognition";
import util from "util";
import idgen from "nanoid";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handle(
  withUser(
    withFileUpload(async (req, res, { upload, db, user }) => {
      try {
        const { files, fields } = upload;
        const [file] = files;
        const slug = idgen.nanoid(3);

        const tags = fields.tags ? fields.tags.split(",") : [];

        if (!file) {
          return res.status(400).json({ error: "'file' missing" });
        }

        console.time("size");
        const metadata = sizeOf(file.buffer);
        console.timeEnd("size");

        const mime = mimeType.lookup(metadata.type);

        console.log(metadata);

        const [pHash, hash, faces] = await Promise.all([
          mime === false
            ? Promise.resolve()
            : perceptualHash(file.buffer, mime),
          sha256Hash(file.buffer),
          detectFaces(file.buffer, {
            width: metadata.width,
            height: metadata.height,
          }).catch((err) => {
            console.log("something went wrong with detecting faces", err);
            return [] as FaceDetect[];
          }),
          uploadParsedFiles([
            {
              ...file,
              path: slug,
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

        await db.image.create({
          data: {
            fileName: file.originalname,
            // @TODO: pass this data from useUser
            uploadType: "TOKEN",
            mimetype: databaseType,
            pHash: pHash as string | undefined,
            hash: hash as string,
            slug,
            user: {
              connect: { id: 1 },
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
          url: `https://my.simp.pics/${file.originalname}`,
          tags,
          width: metadata.width,
          height: metadata.height,
          mimetype: metadata.type,
          filename: file.originalname,
          bytes: file.size,
          bytesHuman: humanFileSize(file.size),
          faces: facesDims,
          hash,
          perceptualHash: pHash,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    })
  )
);
