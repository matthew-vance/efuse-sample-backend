import express, { Express } from "express";
import pino from "express-pino-logger";
import router from "./router";

export const createApp = (): Express => {
  const app = express();

  app.use(pino());
  app.use(express.json());

  app.use("/api", router);

  return app;
};
