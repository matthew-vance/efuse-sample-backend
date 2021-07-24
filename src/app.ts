import express, { Express } from "express";

export const createApp = (): Express => {
  const app = express();

  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  return app;
};
