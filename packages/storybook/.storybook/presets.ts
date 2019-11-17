export default [
  {
    name: '@storybook/addon-docs/preset',
    options: {
      configureJSX: true,
      babelOptions: {},
      sourceLoaderOptions: null,
    },
  },
  {
    name: '@storybook/addon-storysource/preset',
    options: {
      parser: 'typescript',
    },
  },
]
