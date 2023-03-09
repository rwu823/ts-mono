/* eslint-disable filenames/match-exported */

import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from 'next/constants.js'

// import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'
import { visit } from 'unist-util-visit'

// const withVanillaExtract = createVanillaExtractPlugin()

/**
 * @type {import('next').NextConfig}
 **/
const config = {
  // reactStrictMode: true,
  i18n: {
    locales: ['en', 'zh-TW', 'ja'],
    defaultLocale: 'en',
  },
  experimental: {
    swcPlugins: [
      [
        '@lingui/swc-plugin',
        {
          // the same options as in .swcrc
        },
      ],
    ],
  },
  swcMinify: false,
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

    // config.module.rules.push(
    //   {
    //     test: /\.md$/,
    //     use: 'raw-loader',
    //   },
    //   {
    //     test: /\.mdx$/,
    //     use: [
    //       options.defaultLoaders.babel,
    //       {
    //         loader: '@mdx-js/loader',

    //         /** @type {import('@mdx-js/loader').Options} */
    //         options: {
    //           rehypePlugins: [rehypeMetaAsAttributes],
    //           remarkPlugins: [],
    //           format: 'mdx',
    //           jsx: true,
    //           providerImportSource: '@mdx-js/react',
    //         },
    //       },
    //     ],
    //   },
    // )

    return config
  },
}

export default config

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
