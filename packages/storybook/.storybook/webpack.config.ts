import { Configuration } from 'webpack'
import path from 'path'
export default {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: path.resolve(__dirname, '../'),
      },
      {
        test: /story\.tsx?$/,
        use: '@storybook/source-loader',
        enforce: 'pre',
      },
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
            options: {},
          },
        ],
      },
    ],
  },
} as Configuration
