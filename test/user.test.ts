import { Express } from "express";
import request from "supertest";
import { createApp } from "../src/app";

describe("User", () => {
  let app: Express;

  beforeEach(() => {
    app = createApp();
  });

  test("GET /:userId", async () => {
    await request(app).get("/api/user/1").expect(200);
  });

  test("POST /", async () => {
    await request(app).post("/api/user").expect(201);
  });
});
