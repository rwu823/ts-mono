import { Configuration } from 'webpack'

export default {
  addons: [
    '@storybook/addon-storysource/register',
    '@storybook/addon-actions/register',
    '@storybook/addon-backgrounds/register',
    '@storybook/addon-viewport/register',
    '@storybook/addon-contexts/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-jest/register',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
      },
    },
  ],

  stories: ['../components/**/story.tsx'],

  webpackFinal: (config: Configuration) => {
    config.module!.rules.push(
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              transpileOnly: true,
              useCache: true,
              cacheDirectory: 'node_modules/.cache/atl',
            },
          },
          {
            loader: 'react-docgen-typescript-loader',
          },
        ],
      },
      {
        test: /story\.tsx?$/,
        use: {
          loader: '@storybook/source-loader',
          options: {
            parser: 'typescript',
          },
        },
        enforce: 'pre',
      },
    )

    config.resolve!.extensions!.push('.ts', '.tsx')

    return config
  },
}
