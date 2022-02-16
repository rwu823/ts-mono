module.exports = {
  overrides: [
    {
      files: ['**/*.tsx?'],
      extends: ['plugin:@typescript-eslint/recommended'],
    },
  ],

  rules: {
    '@typescript-eslint/consistent-type-imports': [
      2,
      { prefer: 'type-imports' },
    ],
  },
}
