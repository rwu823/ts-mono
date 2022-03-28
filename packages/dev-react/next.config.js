/* eslint-disable filenames/match-exported */

import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from 'next/constants.js'

import { visit } from 'unist-util-visit'

export default (phase, { defaultConfig }) => {
  const nextConfig = {
    experimental: {
      emotion: true,
      concurrentFeatures: true,
    },

    swcMinify: true,

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
        // {
        //   test: /\.tsx?$/,
        //   include: undefined,
        //   use: [options.defaultLoaders.babel],
        // },
        {
          test: /\.mdx$/,
          use: [
            options.defaultLoaders.babel,
            {
              loader: '@mdx-js/loader',

              /** @type {import('@mdx-js/loader').Options} */
              options: {
                rehypePlugins: [rehypeMetaAsAttributes],
                remarkPlugins: [],
                format: 'mdx',
                jsx: true,
                providerImportSource: '@mdx-js/react',
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

/** @type {import('unified').Plugin<Array<void>, import('hast').Root>} */
function rehypeMetaAsAttributes() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'code' && node.data?.meta) {
        for (const match of node.data.meta.split(' ')) {
          const [key, value] = match.split('=')

          node.properties[key] = eval(value)
        }
      }
    })
  }
}
