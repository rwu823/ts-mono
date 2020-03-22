// const withTypescript = require('@zeit/next-typescript')

// const withMDX = require('@next/mdx')({
//   extension: /\.mdx?$/,
// })

module.exports = {
  assetPrefix: './',
  pageExtensions: ['tsx', 'mdx'],
  webpack(config, options) {
    config.resolve.mainFields = ['module', 'main', 'browser']
    // config.devtool = 'cheap-eval-source-map'

    if (!options.isServer) {
      config.plugins = config.plugins.filter(
        (plugin) => !('useTypescriptIncrementalApi' in plugin),
      )
    }

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
