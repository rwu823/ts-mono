/* eslint-disable import/newline-after-import */

const env = require('./')
const { read } = require('./utils')

;(async () => {
  const pkg = JSON.parse(await read('./package.json'))

  console.log(
    Object.entries({
      ...env,
      VER: pkg.version,
      GIT_TAG: `v${pkg.version}`,
    }).reduce(
      (envBash, [key, value]) => `${envBash}export ${key}='${value}'\n`,
      '',
    ),
  )
})()
