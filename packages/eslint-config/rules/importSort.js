module.exports = {
  rules: {
    'simple-import-sort/imports': [
      2,
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          ['^node:'],
          ['^react', '^redux'],
          ['^styled-components$', '^styled-'],
          ['^use-'],
          ['^next', '^next/'],
          ['^@apollo'],
          ['^@storybook/react$', '^@storybook'],
          ['^@'],
          ['^'],
          ['^\\.'],
        ],
      },
    ],
    'simple-import-sort/exports': 2,
    'sort-imports': 0,
  },
}
