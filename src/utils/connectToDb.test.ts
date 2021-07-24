import { mocked } from "ts-jest/utils";
import mongoose from "mongoose";
import { connectToDb } from ".";

jest.mock("mongoose");

const mockMongoose = mocked(mongoose);

it("makes the db connection", () => {
  mockMongoose.connect.mockResolvedValue({} as typeof mongoose);

  connectToDb("testConnectionString");

  expect(mockMongoose.connect).toBeCalledWith("testConnectionString", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});
