import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'

import fg from 'fast-glob'

import rootPkg from '../../../package.json'
import { copyList } from '../bin/share.js'
import pkg from '../package.json'

const require = createRequire(import.meta.url)
const { copy, rm } = require('fs-extra')

;(() => {
  // === copy file
  const root = '../..'
  Promise.all(copyList.map((src) => copy(path.join(root, src), `out/${src}`)))

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
          'rm:pkg': rootPkg.scripts['rm:pkg'],
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
