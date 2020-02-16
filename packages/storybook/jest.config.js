module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  testPathIgnorePatterns: ['node_modules', 'e2e'],
  setupFilesAfterEnv: ['./jest/setupReactTestEnv.ts'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
}
