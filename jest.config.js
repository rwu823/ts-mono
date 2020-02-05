module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
}
