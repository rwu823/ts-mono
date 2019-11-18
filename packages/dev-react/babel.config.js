const { NODE_ENV } = process.env

const isDev = !NODE_ENV || NODE_ENV === 'development'

module.exports = api => {
  api.cache(true)

  return {
    presets: ['next/babel'],
    plugins: [
      '@babel/proposal-optional-chaining',
      '@babel/proposal-nullish-coalescing-operator',
      ['styled-components', { displayName: isDev }],
    ],
  }
}
