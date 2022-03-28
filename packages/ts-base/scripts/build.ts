import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'

import fg from 'fast-glob'

// @ts-ignore package.json
import rootPkg from '../../../package.json'
// @ts-ignore package.json
import pkg from '../package.json'

const require = createRequire(import.meta.url)
const { copy, rm } = require('fs-extra')

;(async () => {
  // === copy file
  const root = '../..'
  Promise.all(
    [
      'bin',

      path.resolve(root, 'prettier.config.cjs'),
      path.resolve(root, '.gitignore'),
      path.resolve(root, 'tsconfig.json'),
      path.resolve(root, '@types'),
      path.resolve(root, '.vscode'),
    ].map((from) => {
      const base = path.basename(from)
      return copy(from, `out/${base}`)
    }),
  )

  // === extend package.json
  fs.writeFileSync(
    'out/package.json',
    JSON.stringify(
      Object.assign(pkg, {
        version: rootPkg.version,
        'lint-staged': rootPkg['lint-staged'],
        browserslist: rootPkg.browserslist,
        scripts: {
          lint: rootPkg.scripts.lint,
          'rm-pkg': rootPkg.scripts['rm-pkg'],
        },
      }),
      null,
      2,
    ),
  )

  // === clean all .d.ts
  fg(['out/**/*.d.ts', 'out/*tsbuildinfo']).then((dts) =>
    Promise.all(dts.map((d) => rm(d))),
  )
})()
