import { mockConsoleLog, mockProcessExit } from "../../testUtils";
import { shutdown } from ".";

afterAll(() => {
  jest.restoreAllMocks();
});

it("exits the process", () => {
  shutdown(99);

  expect(mockConsoleLog).toBeCalledWith("Shutting down...");
  expect(mockProcessExit).toBeCalledWith(99);
});
