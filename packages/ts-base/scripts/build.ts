import fg from 'fast-glob'
import { copy, rm } from 'fs-extra'
import fs from 'node:fs'
import path from 'node:path'

// @ts-ignore
// eslint-disable-next-line import/no-relative-packages
import rootPkg from '../../../package.json'
import pkg from '../package.json'

1
;(async () => {
  // === copy file
  const root = '../..'
  Promise.all(
    [
      'bin',

      path.resolve(root, 'prettier.config.js'),
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
