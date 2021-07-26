import { promisify } from "util";
import redis from "redis";
import { env } from "../utils";
const client = redis.createClient(env.redisUri);

client.on("error", (err) => {
  console.error(err.toString());
});

const sadd: (arg1: string[]) => Promise<number> = promisify(client.sadd).bind(
  client
);

const mget: (arg1: string[]) => Promise<string[]> = promisify(client.mget).bind(
  client
);

export default {
  get: promisify(client.get).bind(client),
  set: promisify(client.set).bind(client),
  sadd,
  smembers: promisify(client.smembers).bind(client),
  mget,
};
