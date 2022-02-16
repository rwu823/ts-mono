import type { InitialOptionsTsJest } from 'ts-jest'

export default {
  preset: 'ts-jest',
  automock: true,
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  testPathIgnorePatterns: ['node_modules', 'e2e', 'packages/storybook'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
} as InitialOptionsTsJest
