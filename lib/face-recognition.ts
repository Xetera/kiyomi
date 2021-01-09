import "@tensorflow/tfjs-node";
import * as fs from "fs";
import * as path from "path";

import * as canvas from "canvas";

import * as faceapi from "face-api.js";
import {
  WithFaceDescriptor,
  WithFaceLandmarks,
  FaceDetection,
} from "face-api.js";
import { Face, PrismaClient } from "@prisma/client";

const { Canvas, Image, ImageData } = canvas;
// @ts-ignore
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

async function checkWeights() {
  // @ts-ignore
  if (!global.loadedWeights) {
    console.log("Weights were not loading, loading now");
    await Promise.all([
      faceapi.nets.faceRecognitionNet.loadFromDisk("./weights"),
      faceapi.nets.ssdMobilenetv1.loadFromDisk("./weights"),
      faceapi.nets.faceLandmark68Net.loadFromDisk("./weights"),
    ]);
  }
  // @ts-ignore
  global.loadedWeights = true;
}

export type FaceDetect = WithFaceDescriptor<
  WithFaceLandmarks<{ detection: FaceDetection }>
>;

export const supportedFaceDetectionMimetypes = new Set([
  "jpeg",
  "png",
  "jpg",
  "webp",
  "avif",
]);

export function canDetectFaces(mimetype: string) {
  return supportedFaceDetectionMimetypes.has(mimetype);
}

export async function detectFaces(
  buf: Buffer,
  { width, height }: { width: number; height: number }
) {
  await checkWeights();
  const image = new Image();
  image.src = buf;
  image.height = height;
  image.width = width;

  console.log("detecting faces");
  const detections = await faceapi
    // @ts-ignore
    .detectAllFaces(image)
    .withFaceLandmarks()
    .withFaceDescriptors();

  const out = faceapi.createCanvasFromMedia(image as any) as any;
  faceapi.draw.drawDetections(out, detections);

  const baseDir = "out";
  console.log("done, saved results to out/faceDetection.jpg");
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
  }

  fs.writeFileSync(
    path.resolve(baseDir, "detections.jpg"),
    out.toBuffer("image/jpeg")
  );
  return detections;
}

export type RecognitionMatch = {
  slug: string;
  predictionScore: number /* float */;
  person: {
    id: number;
    description?: string;
    name: string;
  };
};

export async function findClosestMatchingPerson(
  faceIds: number[],
  { db, findCount = 5 }: { db: PrismaClient; findCount: number }
): Promise<Array<{ face: number; matches: RecognitionMatch[] }>> {
  return Promise.all(
    faceIds.map(async (faceId) => {
      return {
        face: faceId,
        matches: await db.$queryRaw`
        SELECT i.slug,
          json_build_object(
             'id', p.id,
             'description', p.description,
             'name', p.name
          ) as person,
          ((1 - ((SELECT descriptor from faces where id = ${faceId}) <-> m.descriptor)) * 100) as "predictionScore"
        FROM faces m
          INNER JOIN images i on i.id = m.image_id
          inner join persons p on p.id = m.person_id
        where m.id != ${faceId}
        ORDER BY "predictionScore" DESC
        LIMIT ${findCount};
        `,
      };
    })
  ).then((r) => {
    console.log(r);
    return r;
  });
}
