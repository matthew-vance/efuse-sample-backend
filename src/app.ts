import express, { Express } from "express";
import pino from "express-pino-logger";

export const createApp = (): Express => {
  const app = express();

  app.use(pino());
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  return app;
};
