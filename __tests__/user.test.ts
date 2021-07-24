import { mocked } from "ts-jest/utils";
import { DocumentType } from "@typegoose/typegoose";
import { Express } from "express";
import request from "supertest";
import { createApp } from "../src/app";
import UserModel, { User } from "../src/modules/user/user.model";

jest.mock("mongoose");
jest.mock("../src/modules/user/user.model", () => ({ create: jest.fn() }));

const mockUserModel = mocked(UserModel, true);

describe("User", () => {
  let app: Express;

  beforeEach(() => {
    app = createApp();
  });

  test("GET /:userId success", async () => {
    await request(app).get("/api/user/1").expect(200);
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
});
