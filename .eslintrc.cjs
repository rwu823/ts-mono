module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
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
    'plugin:deprecation/recommended',

    '@rwu823/eslint-config/rules/base',
    '@rwu823/eslint-config/rules/react',
    '@rwu823/eslint-config/rules/simple-import-sort',
    '@rwu823/eslint-config/rules/compat',
    '@rwu823/eslint-config/rules/unicorn',
    '@rwu823/eslint-config/rules/testing-library',
    // '@rwu823/eslint-config/rules/import',
    '@rwu823/eslint-config/rules/filenames',
    // '@rwu823/eslint-config/rules/a11y',
    '@rwu823/eslint-config/rules/typescript',
    '@rwu823/eslint-config/rules/tailwind',
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
  settings: {
    react: {
      version: 'detect',
    },
  },
}
