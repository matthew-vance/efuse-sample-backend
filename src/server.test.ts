import { mocked } from "ts-jest/utils";
import { Express } from "express";
import { createApp } from "./app";
import { connectToDb } from "./utils";

jest.mock("../src/app");
jest.mock("../src/utils");

const mockConnectToDb = mocked(connectToDb);
const mockCreateApp = mocked(createApp, true);

describe("Server", () => {
  it("creates an app, connects to db, and listens for requests", () => {
    const mockListen = jest.fn((port, func) => {
      func();
    });

    const mockLog = jest.spyOn(console, "log").mockImplementation(jest.fn());
    mockCreateApp.mockReturnValue({
      listen: mockListen,
    } as unknown as Express);

    mockConnectToDb.mockImplementation(() => Promise.resolve());

    jest.isolateModules(async () => {
      await require("../src/server");

      expect(mockCreateApp).toBeCalled();
      expect(mockConnectToDb).toBeCalledWith("mongodb://localhost:27017/efuse");
      expect(mockListen).toBeCalledWith(5000, expect.any(Function));
      expect(mockLog).toBeCalledWith("App listening at http://localhost:5000");
    });
  });
});
