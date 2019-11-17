const fs = require('fs')
const { write, read } = require('./utils')
const env = require('./')

;(async () => {
  const pkg = JSON.parse(await read('package.json'))

  Object.entries({
    ...env,
    VER: pkg.version,
    GIT_TAG: `v${pkg.version}`,
  }).forEach(([file, str]) => {
    write(`%${file}`, str)
  })
})()
