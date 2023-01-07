/**
 * This file currently for storybook only
 * @param {*} api
 * @returns
 */

/** @type {import('@babel/core').ConfigFunction} */
module.exports = (api) => {
  api.cache(true)

  return {
    presets: [
      '@babel/preset-env',
      ['@babel/preset-typescript', { allExtensions: true }],
    ],
  }
}
