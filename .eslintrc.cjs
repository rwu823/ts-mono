module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
  },

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:compat/recommended',
    'plugin:unicorn/recommended',
    'plugin:react/recommended',
    'plugin:jest-dom/recommended',
    'plugin:testing-library/react',
    'plugin:prettier/recommended',

    '@ts-mono/eslint-config/rules/base',
    '@ts-mono/eslint-config/rules/react',
    '@ts-mono/eslint-config/rules/simple-import-sort',
    '@ts-mono/eslint-config/rules/compat',
    '@ts-mono/eslint-config/rules/unicorn',
    '@ts-mono/eslint-config/rules/testing-library',
    // '@ts-mono/eslint-config/rules/import',
    '@ts-mono/eslint-config/rules/filenames',
    // '@ts-mono/eslint-config/rules/a11y',
    '@ts-mono/eslint-config/rules/typescript',
    '@ts-mono/eslint-config/rules/deprecation',
    '@ts-mono/eslint-config/rules/tailwind',
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
