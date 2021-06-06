import "dotenv/config";
import amqp from "amqplib";
import { config, logger } from "./config";
import { canDetectFaces, checkWeights, detectFaces } from "./face-recognition";
import axios from "axios";
import { colorPalette, phash } from "./ffi";
import { backend } from "../../shared/sdk";

const authorization = config.get("userToken");

console.log(`Created API client with token: ${authorization}`);

const faceRecognitionQueueName = config.get("faceRecognitionQueue");
const faceRecognitionRetryExchangeName = "face-recognition-retry";

let faceRecognitionQueue: amqp.Channel | undefined;

function publish(routingKey: string, content: object, delay: number) {
  try {
    if (!faceRecognitionQueue) {
      return logger.error(`Could not push to queue, not initialized`);
    }
    faceRecognitionQueue.publish(
      faceRecognitionRetryExchangeName,
      routingKey,
      Buffer.from(JSON.stringify(content)),
      { headers: { "x-delay": delay } }
    );
  } catch (e) {
    logger.error(`[AMQP] failed ${e.message}`);
  }
}

function createConsumer(channel: amqp.Channel) {
  return <T>(f: (arg: T, packet: amqp.ConsumeMessage) => any) => {
    return async (packet: amqp.ConsumeMessage | null) => {
      if (!packet) {
        console.error("received a null packet...? Is the connection dying?");
        return;
      }

      let message;
      try {
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
        console.log(`Successfully processed packet`);
        channel.ack(packet);
      } catch (err) {
        const delay = 1000 * 60 * 5;
        logger.error(err);
        logger.info(`Dead lettering packet with ${delay} ms delay`);
        if (message) {
          publish(faceRecognitionQueueName, message, delay);
        }
        channel.ack(packet);
      }
    };
  };
}

async function processFaces(conn: amqp.Connection) {
  const channel = await conn.createChannel();
  const consume = createConsumer(channel);
  channel.assertQueue(faceRecognitionQueueName);
  channel.consume(
    faceRecognitionQueueName,
    consume(async (msg: { slug: string; ireneBotIdolId?: number }) => {
      if (!msg.slug) {
        logger.debug(msg);
        return logger.warn(`Did not receive a slug with an incoming message`);
      }
      const { slug } = msg;

      const { image } = await backend.query({
        image: [
          { slug },
          {
            id: true,
            width: true,
            height: true,
            rawUrl: true,
            mimetype: true,
            faceScanDate: true,
          },
        ],
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
      const label = `detection-time-${image.id}`;
      console.time(label);
      const [faces, hash, palette] = await Promise.all([
        detectFaces(imageBuffer.data),
        phash(imageBuffer.data),
        colorPalette(imageBuffer.data),
      ]);
      console.timeEnd(label);

      const out = await backend.mutation({
        labelImage: [
          {
            slug: msg.slug,
            ireneBotId: msg.ireneBotIdolId,
            pHash: hash,
            palette,
            faces: faces.map(({ detection, descriptor }) => ({
              certainty: detection.score,
              x: detection.box.x,
              y: detection.box.y,
              width: detection.box.width,
              height: detection.box.height,
              descriptor: Array.from(descriptor),
            })),
          },
          {
            id: true,
          },
        ],
      });
    })
  );
}

const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

async function connect(): Promise<amqp.Connection> {
  const RECONNECT_DELAY = 2000;
  try {
    const connection = await amqp.connect(config.get("amqpUrl"));
    connection.on("error", err => {
      if (err.message !== "Connection closing") {
        logger.error("[AMQP] conn error", err.message);
      }
    });
    connection.on("close", () => {
      logger.info("[AMQP] Reconnecting...");
      setTimeout(connect, RECONNECT_DELAY);
    });
    logger.info("Connected!");
    return connection;
  } catch (err) {
    logger.error(err);
    await wait(RECONNECT_DELAY);
    return connect();
  }
}

async function populateQueues(conn: amqp.Connection) {
  const chan = await conn.createConfirmChannel();
  chan.on("close", () => {
    logger.info("[AMQP] channel closed");
  });
  faceRecognitionQueue = chan;
  chan.assertExchange(faceRecognitionRetryExchangeName, "x-delayed-message", {
    autoDelete: false,
    durable: true,
    arguments: {
      "x-delayed-type": "direct",
    },
  });
  chan.assertQueue(faceRecognitionQueueName);
  chan.bindQueue(
    faceRecognitionQueueName,
    faceRecognitionRetryExchangeName,
    faceRecognitionQueueName
  );
}

async function main() {
  logger.info("Running app");
  await checkWeights();
  const conn = await connect();
  await populateQueues(conn);
  processFaces(conn);
  return;
}

main();
