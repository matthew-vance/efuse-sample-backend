import { mocked } from "ts-jest/utils";
import { Express } from "express";
import { createApp } from "./app";
import { connectToDb } from "./utils";

jest.mock("../src/app");
jest.mock("../src/utils");

const mockConnectToDb = mocked(connectToDb);
const mockCreateApp = mocked(createApp, true);

describe("Server", () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("creates an app, connects to db, and listens for requests", () => {
    const mockListen = jest.fn((port, cb) => {
      cb();
    });

    const mockLog = jest.spyOn(console, "log").mockImplementation(() => {});
    mockCreateApp.mockReturnValue({
      listen: mockListen,
    } as unknown as Express);

    mockConnectToDb.mockReturnValue(Promise.resolve());

    jest.isolateModules(async () => {
      await require("../src/server");

      expect(mockCreateApp).toBeCalledWith();
      expect(mockConnectToDb).toBeCalledWith("testmongouri");
      expect(mockListen).toBeCalledWith(5000, expect.any(Function));
      expect(mockLog).toBeCalledWith("App listening at http://localhost:5000");
    });
  });

  it("exits when there is a db connection error", () => {
    const mockError = jest.spyOn(console, "error").mockImplementation(() => {});
    const mockExit = jest
      .spyOn(process, "exit")
      .mockImplementation((() => {}) as unknown as (code?: number) => never);
    mockCreateApp.mockReturnValue({
      listen: jest.fn(),
    } as unknown as Express);
    mockConnectToDb.mockReturnValue(Promise.reject());

    jest.isolateModules(async () => {
      await require("../src/server");
      expect(mockError).toBeCalledWith(
        "Error connecting to MongoDB. Check your MONGO_URI env var."
      );
      expect(mockExit).toBeCalledWith(1);
    });
  });
});
