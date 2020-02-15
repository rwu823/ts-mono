module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  testPathIgnorePatterns: ['node_modules', 'e2e'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],

  // transform: {
  //   '^.+\\.[tj]sx?$': 'babel-jest',
  //   '^.+\\.mdx$': '@storybook/addon-docs/jest-transform-mdx',
  // },
}
