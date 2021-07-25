/* eslint-disable @typescript-eslint/no-var-requires */
const OLD_ENV = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = { ...OLD_ENV };
});

afterAll(() => {
  process.env = OLD_ENV;
});

it("sets defaults", () => {
  delete process.env.NODE_ENV;
  delete process.env.MONGO_URI;
  delete process.env.REDIS_URI;

  const { env } = require("./env");

  expect(env.nodeEnv).toEqual("development");
  expect(env.mongoUri).toEqual("");
  expect(env.redisUri).toEqual("");
});
