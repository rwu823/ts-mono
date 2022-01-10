import glob from 'fast-glob'
import fs from 'fs'
import path from 'path'

import rootPkg from '../../../package.json'
import pkg from '../package.json'

const excludeSet = new Set([
  'out',
  '.git',
  '.husky',
  'yarn.lock',
  '.env.ts',
  'src',
  'node_modules',
  'package.json',
  'packages',
  'scripts',
  '.eslintignore',
  '.eslintrc',
  'algorithm',
])

fs.writeFileSync(
  'out/package.json',
  JSON.stringify(
    Object.assign(pkg, {
      version: rootPkg.version,
      'lint-staged': pkg['lint-staged'],
      scripts: {
        ...rootPkg.scripts,
        ...pkg.scripts,
      },
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
