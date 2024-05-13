/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import path from 'node:path'
import { fileURLToPath } from 'node:url'

import eslint from '@eslint/js'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import * as regexpPlugin from 'eslint-plugin-regexp'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import tsEslint from 'typescript-eslint'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ERROR = 'error'
const OFF = 'off'

const config = tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.recommendedTypeChecked,

  unicorn.configs['flat/recommended'],
  regexpPlugin.configs['flat/recommended'],

  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
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
      ...reactHooks.configs.recommended.rules,
    },
  },

  // reactHooks.configs.recommended,

  // ...compat.config({
  //   extends: ['plugin:deprecation/recommended'],
  //   parser: '@typescript-eslint/parser',
  //   parserOptions: {
  //     ecmaVersion: 2020,
  //     sourceType: 'module',
  //     project: './tsconfig.json', // <-- Point to your project's "tsconfig.json" or create a new one.
  //   },
  // }),
  // {
  //   plugins: {
  //     'react-hooks': reactHooks,
  //   },
  //   rules: reactHooks.configs.recommended.rules,
  // },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': ERROR,
      'simple-import-sort/exports': ERROR,
    },
  },

  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  prettierRecommended,

  {
    rules: {
      'react/jsx-sort-props': ERROR,
      '@typescript-eslint/no-unsafe-assignment': OFF,

      'unicorn/prevent-abbreviations': OFF,
      'unicorn/filename-case': OFF,
    },
  },

  {
    ignores: ['**/{.next,node_modules,out,styled-system}'],
  },
)

export default config
