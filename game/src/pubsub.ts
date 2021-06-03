import IORedis, { Redis } from 'ioredis';
import { z } from 'zod';
import { Messages } from '~/shared/game';
import { logger } from './config';
import { createRedis } from './redis';

export const PubsubEvents = {
  startGame: z.object({ game: z.string() }),
};

PubsubEvents.startGame.parse('');

export type Publisher<T extends keyof typeof PubsubEvents> = (
  data: z.infer<typeof PubsubEvents[T]>
) => void;

export function createPubsub() {
  const pub = createRedis();
  const sub = createRedis();
  return {
    listenFor<T extends keyof typeof PubsubEvents>(
      key: T,
      f: (data: z.infer<typeof PubsubEvents[T]>) => void
    ): Publisher<T> {
      sub.subscribe(key, (err) => {
        if (err) {
          logger.error(`Could not subscribe to ${key}`);
          logger.error(err);
        }
      });
      sub.on(key, async (serialized) => {
        const data = await PubsubEvents[key].parseAsync(serialized);
        f(data);
      });
      return (data) => {
        pub.publish(key, JSON.stringify(data));
      };
    },
  };
}
