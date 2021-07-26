import { mocked } from "ts-jest/utils";
import { DocumentType } from "@typegoose/typegoose";
import { Express } from "express";
import request from "supertest";
import { createApp } from "../src/app";
import PostModel, { Post } from "../src/modules/post/post.model";

jest.mock("redis");
jest.mock("../src/modules/post/post.model", () => ({
  create: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
}));

const mockPostModel = mocked(PostModel, true);

describe("Post", () => {
  let app: Express;

  beforeEach(() => {
    app = createApp();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("GET /:postId success", async () => {
    jest
      .spyOn(PostModel, "findById")
      .mockResolvedValue({ _id: "somepostid" } as DocumentType<Post>);

    const response = await request(app).get("/api/post/somepostid").expect(200);

    expect(mockPostModel.findById).toBeCalledWith("somepostid");
    expect(response.body).toEqual(
      expect.objectContaining({
        _id: "somepostid",
      })
    );
  });

  test("GET /:postId not found", async () => {
    jest.spyOn(PostModel, "findById").mockResolvedValue(null);

    await request(app).get("/api/post/somepostid").expect(404);
  });

  test("POST / success", async () => {
    jest
      .spyOn(PostModel, "create")
      .mockResolvedValue({ _id: "createdPostId" } as DocumentType<Post>);

    const response = await request(app)
      .post("/api/post")
      .send({
        user: "Thanos",
        title: "I am inevitable.",
        content: "Dread it... Run from it... Destiny Arrives all the same.",
      })
      .expect(201);

    expect(mockPostModel.create).toBeCalledWith({
      user: "Thanos",
      title: "I am inevitable.",
      content: "Dread it... Run from it... Destiny Arrives all the same.",
    });
    expect(response.body).toEqual(
      expect.objectContaining({
        location: expect.stringContaining("createdPostId"),
        entity: expect.any(Object),
      })
    );
  });

  test("POST / fail", async () => {
    jest.spyOn(PostModel, "create").mockRejectedValue("Whoops...");

    await request(app)
      .post("/api/post")
      .send({
        user: "Thanos",
        title: "The Universe is finite, its resources finite.",
        content: "I’m sorry Little one.",
      })
      .expect(500);
  });

  test("POST / invalid", async () => {
    await request(app).post("/api/post").send({}).expect(422);
  });

  test("PATCH /:postId success", async () => {
    jest.spyOn(PostModel, "findByIdAndUpdate").mockResolvedValue({
      _id: "somepostid",
    } as DocumentType<Post> | null);

    const response = await request(app)
      .patch("/api/post/somepostid")
      .send({
        title: "They called me a mad man.",
        content:
          "I could simply snap my fingers and they would all cease to exist.",
      })
      .expect(200);

    expect(mockPostModel.findByIdAndUpdate).toBeCalledWith(
      "somepostid",
      {
        title: "They called me a mad man.",
        content:
          "I could simply snap my fingers and they would all cease to exist.",
      },
      { new: true, runValidators: true }
    );
    expect(response.body).toEqual(
      expect.objectContaining({
        location: expect.stringContaining("somepostid"),
        entity: expect.any(Object),
      })
    );
  });

  test("PATCH /:postId fail", async () => {
    jest.spyOn(PostModel, "findByIdAndUpdate").mockRejectedValue("Whoops...");

    await request(app)
      .patch("/api/post/somepostid")
      .send({
        title: "They called me a mad man.",
        content:
          "I could simply snap my fingers and they would all cease to exist.",
      })
      .expect(500);
  });

  test("PATCH /:postId not found", async () => {
    jest.spyOn(PostModel, "findByIdAndUpdate").mockResolvedValue(null);

    await request(app)
      .patch("/api/post/somepostid")
      .send({
        title: "They called me a mad man.",
        content:
          "I could simply snap my fingers and they would all cease to exist.",
      })
      .expect(404);
  });

  test("PATCH /:postId invalid", async () => {
    await request(app)
      .patch("/api/post/somepostid")
      .send({ title: "" })
      .expect(422);
  });
});
