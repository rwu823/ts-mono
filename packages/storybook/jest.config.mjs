export default {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  setupFilesAfterEnv: ['./jest/setupReactTestEnv.ts'],
}
