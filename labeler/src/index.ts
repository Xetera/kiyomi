import "dotenv/config";
import amqp from "amqplib";
import { GraphQLClient } from "graphql-request";
import { config, logger } from "./config";
import { getSdk } from "./__generated__/request";
import axios from "axios";
import * as faceapi from "face-api.js";
import { canDetectFaces, checkWeights, detectFaces } from "./face-recognition";
import * as canvas from "canvas";

const { Canvas, Image, ImageData } = canvas;

const client = new GraphQLClient(`${config.get("backendUrl")}/api/graphql`, {
  headers: {
    authorization: config.get("userToken"),
  },
});

const faceRecognitionQueue = config.get("faceRecognitionQueue");

function createConsumer(channel: amqp.Channel) {
  return <T>(f: (arg: T, packet: amqp.ConsumeMessage) => any) => {
    return async (packet: amqp.ConsumeMessage | null) => {
      if (!packet) {
        console.error("received a null packet...? Is the connection dying?");
        return;
      }
      try {
        let message;
        try {
          message = JSON.parse(packet.content.toString());
        } catch (err) {
          console.log(
            `[channel]: ${packet.content.toString()} was not a valid json`
          );
          channel.ack(packet);
          return;
        }
        await f(message, packet);
        channel.ack(packet);
      } catch (err) {
        logger.error(err);
        channel.ack(packet);
      }
    };
  };
}

async function processFaces(conn: amqp.Connection) {
  const channel = await conn.createChannel();
  const consume = createConsumer(channel);
  channel.assertQueue(faceRecognitionQueue);
  channel.consume(
    faceRecognitionQueue,
    consume(async (msg: { slug: string }) => {
      const sdk = getSdk(client);
      const { image } = await sdk.getBackendImage({
        slug: msg.slug,
      });
      if (!image) {
        return logger.warn(`${msg.slug} is not a valid image slug.`);
      }
      if (!canDetectFaces(image.mimetype.toLowerCase())) {
        return logger.warn(
          `Cannot detect faces on image ${image.id} with mimetype ${image.mimetype}`
        );
      }
      const imageBuffer = await axios.get(image.rawUrl, {
        responseType: "arraybuffer",
      });
      const faces = await detectFaces(imageBuffer.data, {
        width: image.width,
        height: image.height,
      });
      await sdk.uploadFaces({
        slug: msg.slug,
        faces: faces.map(({ detection, descriptor }) => ({
          certainty: detection.score,
          x: detection.box.x,
          y: detection.box.y,
          width: detection.box.width,
          height: detection.box.height,
          descriptor: Array.from(descriptor),
        })),
      });
    })
  );
}

async function main() {
  logger.info("Running app");
  // @ts-ignore
  await faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
  await checkWeights();
  const conn = await amqp.connect(config.get("amqpUrl"));
  processFaces(conn);
  return;
}

main();
