module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    'prettier',
    'react-hooks',
    'simple-import-sort',
    'import',
    '@typescript-eslint',
    'filenames',
    'testing-library',
    'jsx-a11y',
  ],
  extends: [
    'airbnb',
    'plugin:import/recommended',
    'plugin:react-hooks/recommended',
    'plugin:compat/recommended',
    'plugin:unicorn/recommended',
    'plugin:jest-dom/recommended',
    '@ts-mono/eslint-config/rules/react',
    '@ts-mono/eslint-config/rules/importSort',
    '@ts-mono/eslint-config/rules/compat',
    '@ts-mono/eslint-config/rules/unicorn',
    '@ts-mono/eslint-config/rules/testing',
    '@ts-mono/eslint-config/rules/import',
    // '@ts-mono/eslint-config/rules/typescript',
    '@ts-mono/eslint-config/rules/filenames',
    '@ts-mono/eslint-config/rules/a11y',
    '@ts-mono/eslint-config/rules/base',
    'prettier',
  ],
  env: {
    browser: true,
    jest: true,
    es6: true,
  },
  globals: {
    globalThis: 'readonly',
  },
  rules: {
    'prettier/prettier': 2,
  },
}
