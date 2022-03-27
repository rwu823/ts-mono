module.exports = {
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 0,
      },
    },
  ],
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      2,
      { prefer: 'type-imports' },
    ],

    '@typescript-eslint/ban-ts-comment': [
      2,
      {
        'ts-expect-error': 'allow-with-description',
      },
    ],
  },
}
