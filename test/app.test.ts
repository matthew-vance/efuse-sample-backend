import { Express } from "express";
import request from "supertest";
import { createApp } from "../src/app";

describe("Root", () => {
  let app: Express;

  beforeEach(() => {
    app = createApp();
  });

  test("GET /", async () => {
    await request(app).get("/");
  });
});
