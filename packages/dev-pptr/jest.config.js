module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  // transform: {
  //   '^.+\\.ts?$': 'ts-jest',
  // },
  globalSetup: './e2e/setup.js',
  globalTeardown: './e2e/teardown.js',
  testEnvironment: './e2e/env.js',
  setupFilesAfterEnv: ['expect-puppeteer'],
}
