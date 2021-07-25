import { mocked } from "ts-jest/utils";
import { Express } from "express";
import { createApp } from "./app";
import { connectToDb, shutdown } from "./utils";
import { mockConsoleLog, mockConsoleError } from "../testUtils";

jest.mock("redis");
jest.mock("../src/app");
jest.mock("../src/utils", () => ({
  env: {
    redisUri: "",
    mongoUri: "testmongouri",
  },
  connectToDb: jest.fn(),
  shutdown: jest.fn(),
}));

const mockConnectToDb = mocked(connectToDb);
const mockShutdown = mocked(shutdown);
const mockCreateApp = mocked(createApp, true);

describe("Server", () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("creates an app, connects to db, and listens for requests", () => {
    const mockListen = jest.fn((port, cb) => {
      cb();
    });

    mockCreateApp.mockReturnValue({
      listen: mockListen,
    } as unknown as Express);

    mockConnectToDb.mockReturnValue(Promise.resolve());

    jest.isolateModules(async () => {
      await require("../src/server");

      expect(mockCreateApp).toBeCalledWith();
      expect(mockConnectToDb).toBeCalledWith("testmongouri");
      expect(mockListen).toBeCalledWith(5000, expect.any(Function));
      expect(mockConsoleLog).toBeCalledWith(
        "App listening at http://localhost:5000"
      );
    });
  });

  it("exits when there is a db connection error", () => {
    mockCreateApp.mockReturnValue({
      listen: jest.fn(),
    } as unknown as Express);
    mockConnectToDb.mockReturnValue(Promise.reject("Whoops..."));

    jest.isolateModules(async () => {
      await require("../src/server");
      expect(mockConsoleError).toBeCalledWith("Whoops...");
      expect(mockShutdown).toBeCalledWith(1);
    });
  });
});
