/* eslint-disable unicorn/prefer-module, filenames/match-exported */

const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
  const nextConfig = {
    productionBrowserSourceMaps: true,

    pageExtensions: ['tsx', 'ts', 'mdx'],
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },

    webpack(config, options) {
      // config.resolve.mainFields = ['module', 'main', 'browser']

      // if (!options.isServer) {
      //   config.plugins = config.plugins.filter(
      //     (plugin) => !('useTypescriptIncrementalApi' in plugin),
      //   )
      // }

      config.module.rules.push(
        {
          test: /\.md$/,
          use: 'raw-loader',
        },
        {
          test: /\.tsx?$/,
          include: undefined,
          use: [options.defaultLoaders.babel],
        },
        {
          test: /\.mdx$/,
          use: [options.defaultLoaders.babel, '@mdx-js/loader'],
        },

        {
          test: /\.svg$/,
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: 'react-svg-loader',
              options: {
                svgo: {},
                jsx: true, // true outputs JSX tags
              },
            },
          ],
        },
      )
      return config
    },
  }
  return nextConfig
}
