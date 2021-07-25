export const shutdown = (exitCode: number): void => {
  console.log("Shutting down...");
  process.exit(exitCode);
};
