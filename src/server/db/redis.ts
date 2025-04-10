import { env } from "@/env";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  url: env.UPSTASH_REDIS_REST_URL,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

export default redis;
