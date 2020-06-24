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
            targets: 'defaults, not safari 5.1',
            useBuiltIns: 'usage',
            corejs: 3,
          },
        },
      ],
    ],
    plugins: [['styled-components', { displayName: isDev }]],
  }
}
