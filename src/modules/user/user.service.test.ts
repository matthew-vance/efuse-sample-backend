import userService from "./user.service";

jest.mock("../../utils", () => ({
  env: {
    mongouri: "testmongouri",
    redisUri: "testredisuri",
  },
  modelHelper: {
    findById: jest.fn().mockResolvedValue({
      firstName: "Gamora",
    }),
  },
}));

describe("readById", () => {
  it("returns a cached user", async () => {
    const user = await userService.findById("sometestid");

    expect(user).toEqual(
      expect.objectContaining({
        firstName: "Gamora",
      })
    );
  });
});
