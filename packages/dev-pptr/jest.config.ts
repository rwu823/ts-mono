import { LaunchOptions } from 'playwright'
import { InitialOptionsTsJest } from 'ts-jest/dist/types'

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

  testEnvironmentOptions: {
    'jest-playwright': {
      launchOptions: {
        devtools: isDebug,
        slowMo: isDebug ? 200 : 0,
      } as LaunchOptions,
    },
  },
} as InitialOptionsTsJest
