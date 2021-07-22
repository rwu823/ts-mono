module.exports = {
  rules: {
    'unicorn/prefer-module': 0,
    'unicorn/prevent-abbreviations': 0,
    'unicorn/no-array-reduce': 0,
    'unicorn/new-for-builtins': 0,
    'unicorn/prefer-node-protocol': 0,
    'unicorn/no-null': 0,
    'unicorn/import-index': 2,
    'unicorn/filename-case': [
      2,
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
      },
    ],
  },

  overrides: [
    {
      files: ['gatsby-*', 'next-*'],
      rules: {
        'unicorn/filename-case': 0,
      },
    },
  ],
}
