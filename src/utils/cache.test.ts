import redis from "redis";
import { mocked } from "ts-jest/utils";
import { mockConsoleError } from "../../testUtils";

jest.mock("redis");

const mockRedis = mocked(redis);

it("registers error event handler", () => {
  const mockClient = {
    on: jest.fn((event, cb) => cb("Whoops...")),
    get: jest.fn(),
    set: jest.fn(),
    sadd: jest.fn(),
    smembers: jest.fn(),
    mget: jest.fn(),
  };
  mockRedis.createClient.mockReturnValue(
    mockClient as unknown as redis.RedisClient
  );
  require("./cache");

  expect(mockClient.on).toBeCalledWith("error", expect.any(Function));
  expect(mockConsoleError).toBeCalledWith("Whoops...");
});
