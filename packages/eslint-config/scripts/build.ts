import fg from 'fast-glob'
import fs from 'fs-extra'

fs.removeSync('out')
fs.mkdirSync('out')

await Promise.all([
  // fs.copy('rules', 'out/rules'),
  fs.copy('../../eslint.config.js', 'out/eslint.config.js'),
  ...fg.sync('./*').map((file) => fs.copy(file, `out/${file}`)),
])
