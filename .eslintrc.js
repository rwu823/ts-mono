module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['simple-import-sort', 'filenames', 'testing-library'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:react-hooks/recommended',
    'plugin:compat/recommended',
    'plugin:unicorn/recommended',

    'plugin:react/recommended',
    'plugin:jest-dom/recommended',
    'plugin:testing-library/react',
    'plugin:prettier/recommended',

    '@ts-mono/eslint-config/rules/react',
    '@ts-mono/eslint-config/rules/importSort',
    '@ts-mono/eslint-config/rules/compat',
    '@ts-mono/eslint-config/rules/unicorn',
    '@ts-mono/eslint-config/rules/testing',
    '@ts-mono/eslint-config/rules/import',
    '@ts-mono/eslint-config/rules/typescript',
    '@ts-mono/eslint-config/rules/filenames',
    // '@ts-mono/eslint-config/rules/a11y',
    '@ts-mono/eslint-config/rules/base',
  ],
  env: {
    browser: true,
    node: true,
    es2021: true,
    jest: true,
  },
  globals: {
    globalThis: 'readonly',
  },
}
