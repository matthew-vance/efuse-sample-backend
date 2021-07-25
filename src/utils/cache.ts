import { promisify } from "util";
import redis from "redis";
import { env } from "../utils";
const client = redis.createClient(env.redisUri);

client.on("error", (err) => {
  console.error(err.toString());
});

export default {
  get: promisify(client.get).bind(client),
  set: promisify(client.set).bind(client),
  del: promisify(client.del).bind(client),
};
