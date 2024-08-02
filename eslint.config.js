import process from 'node:process'

import eslint from '@eslint/js'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import * as regexpPlugin from 'eslint-plugin-regexp'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import tsEslint from 'typescript-eslint'

export const ERROR = 'error'
export const OFF = 'off'
export const WARN = 'warn'

export const reactFiles = '**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'

/**
 * @type {ReturnType<import('typescript-eslint').config>}
 */
const baseConfigs = tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.strictTypeChecked,
  ...tsEslint.configs.stylisticTypeChecked,

  {
    files: ['**/*.js'],
    ...tsEslint.configs.disableTypeChecked,
  },

  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: process.cwd(),
      },
    },
  },

  unicorn.configs['flat/recommended'],
  regexpPlugin.configs['flat/recommended'],

  {
    files: [reactFiles],
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },

    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
    },
  },

  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': ERROR,
      'simple-import-sort/exports': ERROR,
    },
  },

  prettierRecommended,

  {
    rules: {
      'react/jsx-sort-props': ERROR,
      '@typescript-eslint/no-unsafe-assignment': OFF,

      'unicorn/prevent-abbreviations': OFF,
      'unicorn/filename-case': OFF,
      'unicorn/no-null': OFF,
    },
  },

  {
    ignores: ['**/{.next,node_modules,out,styled-system}'],
  },
)

export default baseConfigs

/**
 *
 * @param  {import('typescript-eslint').ConfigWithExtends[]} configs
 * @returns {ReturnType<import('typescript-eslint').config>}
 */
export const defineConfig = (...configs) =>
  tsEslint.config(...baseConfigs, ...configs)
