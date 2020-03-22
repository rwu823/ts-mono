const glob = require('fast-glob')
const path = require('path')
const fs = require('fs')
const pkg = require('../package.json')
const rootPkg = require('../../../package.json')

// prettier-ignore
const excludeSet = new Set([
  'out',
  '.git',
  'yarn.lock',
  '.env.ts',
  'src',
  'node_modules',
  'package.json',
  'packages',
  'scripts',
  '.eslintignore',
  '.eslintrc'
]);

fs.writeFileSync(
  'out/package.json',
  JSON.stringify(
    Object.assign(pkg, {
      version: rootPkg.version,
    }),
    null,
    2,
  ),
)

glob(path.resolve('../../*'), { dot: true, onlyFiles: false, deep: 0 }).then(
  (list) => {
    console.log(list.filter((l) => !excludeSet.has(path.basename(l))).join(' '))
  },
)
