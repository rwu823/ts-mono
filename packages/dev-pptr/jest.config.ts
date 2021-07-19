import { InitialOptionsTsJest } from 'ts-jest/dist/types'

export default {
  preset: 'jest-playwright-preset',

  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
} as InitialOptionsTsJest
