import * as tf from "@tensorflow/tfjs-node";
import { getImageData, imageFromBuffer } from "@canvas/image";
import * as faceapi from "@vladmandic/face-api";
import {
  WithFaceDescriptor,
  WithFaceLandmarks,
  FaceDetection,
} from "@vladmandic/face-api";

export async function checkWeights() {
  // @ts-ignore
  console.log("Weights were not loading, loading now");
  await Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromDisk("./weights"),
    faceapi.nets.ssdMobilenetv1.loadFromDisk("./weights"),
    faceapi.nets.faceLandmark68Net.loadFromDisk("./weights"),
  ]);
  console.log(
    faceapi.version,
    tf.version.tfjs,
    faceapi.tf.version.tfjs,
    faceapi.tf.getBackend()
  );
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

type Detection = faceapi.WithFaceDescriptor<
  faceapi.WithFaceLandmarks<
    {
      detection: faceapi.FaceDetection;
    },
    faceapi.FaceLandmarks68
  >
>[];
export async function detectFaces(buf: Buffer): Promise<Detection> {
  const canvas = await imageFromBuffer(buf);

  const imageData = getImageData(canvas);
  if (!imageData) {
    throw Error("No image data found");
  }

  const tensor = tf.tidy(() => {
    const data = tf.tensor(
      Array.from(imageData.data),
      [canvas.height, canvas.width, 4],
      "int32"
    ); // create rgba image tensor from flat array
    const channels = tf.split(data, 4, 2); // split rgba to channels
    const rgb = tf.stack([channels[0], channels[1], channels[2]], 2); // stack channels back to rgb
    const reshape = tf.reshape(rgb, [1, canvas.height, canvas.width, 3]); // move extra dim from the end of tensor and use it as batch number instead
    return reshape;
  });

  const detections = await faceapi
    .detectAllFaces(tensor)
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
