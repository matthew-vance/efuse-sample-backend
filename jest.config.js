/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: ["./src/**/*.(t|j)s"],
  coverageDirectory: "./coverage",
};
