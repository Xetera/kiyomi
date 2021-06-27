import Redis from 'ioredis';
import { config } from './config';

export function createRedis() {
  return new Redis({
    host: config.get('redisHost'),
    port: config.get('redisPort'),
  });
}
