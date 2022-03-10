/* eslint-disable unicorn/prefer-module */

const { NODE_ENV } = process.env

const isDev = !NODE_ENV || NODE_ENV === 'development'

module.exports = (api) => {
  api.cache(true)

  return {
    presets: [
      [
        'next/babel',
        {
          'preset-env': {
            useBuiltIns: 'usage',
            corejs: 3,
          },
        },
      ],
    ],
    plugins: [['@emotion/styled', { displayName: isDev }]],
  }
}
