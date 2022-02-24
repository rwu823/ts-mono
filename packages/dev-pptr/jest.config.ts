import type { JestPlaywrightConfig } from 'jest-playwright-preset'
import type { InitialOptionsTsJest } from 'ts-jest/dist/types'

const isDebug = !!process.env.PWDEBUG

export default {
  preset: 'jest-playwright-preset',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  setupFiles: ['./e2e/setup.ts'],

  testEnvironmentOptions: {
    'jest-playwright': {
      launchOptions: {
        devtools: isDebug,
        slowMo: isDebug ? 100 : 0,
      },
      contextOptions: {},
    } as JestPlaywrightConfig,
  },
} as InitialOptionsTsJest
