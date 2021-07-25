import { mocked } from "ts-jest/utils";
import express, { Express } from "express";
import pino from "express-pino-logger";
import { env } from "./utils";
import { createApp } from "./app";

jest.mock("express");
jest.mock("express-pino-logger");
jest.mock("./router");

const mockExpress = mocked(express);
const mockPino = mocked(pino);

describe("createApp", () => {
  it("inits express with logger", () => {
    const mockExpressApp = {
      use: jest.fn(),
    } as unknown as Express;
    mockExpress.mockReturnValue(mockExpressApp);
    const app = createApp();

    expect(app).toBeDefined();
    expect(mockExpress).toBeCalledWith();
    expect(mockPino).toBeCalledWith({ level: "silent" });
  });

  it("sets the log level", () => {
    env.nodeEnv = "development";
    const mockExpressApp = {
      use: jest.fn(),
    } as unknown as Express;
    mockExpress.mockReturnValue(mockExpressApp);
    createApp();
    expect(mockPino).toBeCalledWith({ level: "info" });
  });
});
