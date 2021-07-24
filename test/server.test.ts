import { mocked } from "ts-jest/utils";
import { Express } from "express";
import { createApp } from "../src/app";

jest.mock("../src/app");

const mockCreateApp = mocked(createApp, true);

describe("Server", () => {
  it("creates an app and listens for requests", () => {
    const mockListen = jest.fn((port, func) => {
      func();
    });

    const mockLog = jest.spyOn(console, "log").mockImplementation(jest.fn());
    mockCreateApp.mockReturnValue({
      listen: mockListen,
    } as unknown as Express);

    jest.isolateModules(() => {
      require("../src/server");

      expect(mockCreateApp).toBeCalled();
      expect(mockListen).toBeCalledWith(5000, expect.any(Function));
      expect(mockLog).toBeCalledWith("App listening at http://localhost:5000");
    });
  });
});
