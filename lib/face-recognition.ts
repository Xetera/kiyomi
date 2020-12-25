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

const { Canvas, Image, ImageData } = canvas;
// @ts-ignore
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

let loaded = false;

async function loadIfNotLoaded() {
  if (!loaded) {
    console.log("loading weights");
    await Promise.all([
      faceapi.nets.faceRecognitionNet.loadFromDisk("./weights"),
      faceapi.nets.ssdMobilenetv1.loadFromDisk("./weights"),
      faceapi.nets.faceLandmark68Net.loadFromDisk("./weights"),
    ]);
    loaded = true;
  }
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
  await loadIfNotLoaded();
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
