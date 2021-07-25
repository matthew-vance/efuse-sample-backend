import express, { Express } from "express";
import pino from "express-pino-logger";
import router from "./router";
import { env } from "./utils";

export const createApp = (): Express => {
  const app = express();

  app.use(
    pino({
      level: env.nodeEnv === "test" ? "silent" : "info",
    })
  );
  app.use(express.json());

  app.use("/api", router);

  return app;
};
