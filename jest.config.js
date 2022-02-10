module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json"
    }
  },
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  rootDir: '.',
  testMatch: ["**/test/*.test.ts", "**/*.test.ts"],
  testEnvironment: "node",
  setupFiles: ['<rootDir>/test/setup.js'],
  silent: true
};
