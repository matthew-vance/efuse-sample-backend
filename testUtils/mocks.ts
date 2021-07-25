export const createSpy = <T>(
  object: T,
  method: jest.FunctionPropertyNames<Required<T>>
): jest.SpyInstance<T> =>
  jest.spyOn(object, method).mockImplementation((() => {}) as never);

export const mockConsoleLog = createSpy(console, "log");
export const mockConsoleError = createSpy(console, "error");
export const mockProcessExit = createSpy(process, "exit");
