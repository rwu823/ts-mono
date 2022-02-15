import { InitialOptionsTsJest } from 'ts-jest/dist/types'

export default {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  setupFilesAfterEnv: [],
  testEnvironment: 'jsdom',
  watchPathIgnorePatterns: ['.jest-test-results.json'],
} as InitialOptionsTsJest
