export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  mongoUri: process.env.MONGO_URI ?? "",
  redisUri: process.env.REDIS_URI ?? "",
};
