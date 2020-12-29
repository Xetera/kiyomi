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
import { Person, raw } from "@prisma/client";
import idgen from "nanoid";
import { transformImage } from "@/lib/utils/transformer";
import { humanFileSize } from "@/lib/utils/shared";
import SQL from "sql-template-strings";

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
        const personId = fields.person_id;
        const personName = fields.person_name;
        const source = fields.source;
        const personAliases = fields.person_aliases;
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
          mime !== false
            ? dominantColors(file.buffer, mime).catch((err) => {
                console.log(err);
              })
            : [],
          uploadParsedFiles([
            {
              ...file,
              path: slugWithExtension,
              mimetype: mime || "image/jpg",
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
            source,
            isNsfw: nsfw,
            slug,
            ...(palette ? { palette } : {}),
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
          },
        });

        db.face.create;

        let targetPerson: string | number;
        let existingPerson: Person | undefined = personId
          ? await db.person.findUnique({ where: { id: Number(personId) } })
          : undefined;
        if (faces.length === 1 && personName && !existingPerson) {
          existingPerson = await db.person.create({
            data: {
              name: personName,
            },
          });
        }
        console.log(targetPerson);

        const BASE_STRING = `INSERT INTO faces (image_id, score, descriptor, x, y, width, height, person_id) VALUES`;
        const templatedString = faces
          .map(({ detection, descriptor }) => {
            const { x, y, height, width } = detection.box;
            const cube = descriptor.join(",");
            const linkedPerson = existingPerson?.id ?? "NULL";
            return `(${image.id}, ${detection.score}, CUBE(ARRAY[${cube}]), ${x}, ${y}, ${width}, ${height}, ${linkedPerson})`;
          })
          .join(",");

        console.log(templatedString);
        if (faces.length > 0) {
          await db.$executeRaw`${raw(BASE_STRING + templatedString)}`;
        }
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
