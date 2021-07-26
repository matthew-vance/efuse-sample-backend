import { mocked } from "ts-jest/utils";
import { DocumentType } from "@typegoose/typegoose";
import { Express } from "express";
import request from "supertest";
import { createApp } from "../src/app";
import UserModel, { User } from "../src/modules/user/user.model";

jest.mock("redis");
jest.mock("mongoose");
jest.mock("../src/modules/user/user.model", () => ({
  create: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
}));
jest.mock("../src/modules/post/post.model", () => ({
  create: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
}));

const mockUserModel = mocked(UserModel, true);

describe("User", () => {
  let app: Express;

  beforeEach(() => {
    app = createApp();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("GET /:userId success", async () => {
    jest
      .spyOn(UserModel, "findById")
      .mockResolvedValue({ _id: "someuserid" } as DocumentType<User>);

    const response = await request(app).get("/api/user/someuserid").expect(200);

    expect(mockUserModel.findById).toBeCalledWith("someuserid");
    expect(response.body).toEqual(
      expect.objectContaining({
        _id: "someuserid",
      })
    );
  });

  test("GET /:userId not found", async () => {
    jest.spyOn(UserModel, "findById").mockResolvedValue(null);

    await request(app).get("/api/user/someuserid").expect(404);
  });

  test("POST / success", async () => {
    jest
      .spyOn(UserModel, "create")
      .mockResolvedValue({ _id: "createdUserId" } as DocumentType<User>);

    const response = await request(app)
      .post("/api/user")
      .send({
        firstName: "Peter",
        lastName: "Quill",
        email: "peter.quill@gotg.com",
        username: "star-lord",
      })
      .expect(201);

    expect(mockUserModel.create).toBeCalledWith({
      firstName: "Peter",
      lastName: "Quill",
      email: "peter.quill@gotg.com",
      username: "star-lord",
    });
    expect(response.body).toEqual(
      expect.objectContaining({
        location: expect.stringContaining("createdUserId"),
        entity: expect.any(Object),
      })
    );
  });

  test("POST / fail", async () => {
    jest.spyOn(UserModel, "create").mockRejectedValue("Whoops...");

    await request(app)
      .post("/api/user")
      .send({
        firstName: "Rocket",
        lastName: "Racoon",
        email: "rocket@gotg.com",
        username: "trashpanda",
      })
      .expect(500);
  });

  test("PATCH /:userId success", async () => {
    jest.spyOn(UserModel, "findByIdAndUpdate").mockResolvedValue({
      _id: "someuserid",
    } as DocumentType<User> | null);

    const response = await request(app)
      .patch("/api/user/someuserid")
      .send({
        firstName: "Yondu",
        lastName: "Udonta",
        email: "yondu.udonta@gotg.com",
        username: "marypoppins",
      })
      .expect(200);

    expect(mockUserModel.findByIdAndUpdate).toBeCalledWith(
      "someuserid",
      {
        firstName: "Yondu",
        lastName: "Udonta",
        email: "yondu.udonta@gotg.com",
        username: "marypoppins",
      },
      { new: true, runValidators: true }
    );
    expect(response.body).toEqual(
      expect.objectContaining({
        location: expect.stringContaining("someuserid"),
        entity: expect.any(Object),
      })
    );
  });

  test("PATCH /:userId fail", async () => {
    jest.spyOn(UserModel, "findByIdAndUpdate").mockRejectedValue("Whoops...");

    await request(app)
      .patch("/api/user/someuserid")
      .send({
        firstName: "Yondu",
        lastName: "Udonta",
        email: "yondu.udonta@gotg.com",
        username: "marypoppins",
      })
      .expect(500);
  });

  test("PATCH /:userId not found", async () => {
    jest.spyOn(UserModel, "findByIdAndUpdate").mockResolvedValue(null);

    await request(app)
      .patch("/api/user/someuserid")
      .send({
        firstName: "Yondu",
        lastName: "Udonta",
        email: "yondu.udonta@gotg.com",
        username: "marypoppins",
      })
      .expect(404);
  });
});
