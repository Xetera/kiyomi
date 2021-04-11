import "@tensorflow/tfjs-node";
// import * as fs from "fs";
// import * as path from "path";
import { Image } from "canvas";

import * as faceapi from "face-api.js";
import {
  WithFaceDescriptor,
  WithFaceLandmarks,
  FaceDetection,
} from "face-api.js";

export async function checkWeights() {
  // @ts-ignore
  console.log("Weights were not loading, loading now");
  await Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromDisk("./weights"),
    faceapi.nets.ssdMobilenetv1.loadFromDisk("./weights"),
    faceapi.nets.faceLandmark68Net.loadFromDisk("./weights"),
  ]);
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
  const image = new Image();
  image.src = buf;
  image.height = height;
  image.width = width;

  const detections = await faceapi
    // @ts-ignore
    .detectAllFaces(image)
    .withFaceLandmarks()
    .withFaceDescriptors();
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
