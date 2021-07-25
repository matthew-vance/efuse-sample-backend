import userService from "./user.service";

jest.mock("../../utils", () => ({
  env: {
    mongouri: "testmongouri",
    redisUri: "testredisuri",
  },
  cache: {
    get: jest.fn().mockResolvedValue(
      JSON.stringify({
        firstName: "Gamora",
      })
    ),
  },
}));

describe("readById", () => {
  it("returns a cached user", async () => {
    const user = await userService.readById("sometestid");

    expect(user).toEqual(
      expect.objectContaining({
        firstName: "Gamora",
      })
    );
  });
});
