import { stringify } from '@ts-mono/base/utils/json'
import write from '@ts-mono/base/utils/write'

import fg from 'fast-glob'
import fse from 'fs-extra'

import rootPkgJSON from '../../../package.json'
import originalPkgJSON from '../package.json'

fse.removeSync('out')
fse.mkdirSync('out')

const pickEslintPackages = Object.entries(rootPkgJSON.devDependencies).reduce(
  (o, [k, v]) => {
    if (/(^prettier$|^eslint|^@typescript-eslint)/.test(k)) {
      return {
        ...o,
        [k]: v,
      }
    }

    return o
  },
  {},
) as Record<keyof typeof rootPkgJSON.devDependencies, string>

Promise.all([
  fse.copy('rules', 'out/rules'),
  fse.copy('../../.eslintrc.js', 'out/.eslintrc.js'),
  ...fg.sync('./*').map((file) => fse.copy(file, `out/${file}`)),
])
  .then(() => {
    originalPkgJSON.dependencies = pickEslintPackages

    return originalPkgJSON
  })
  .then(() => write(stringify(originalPkgJSON)).to('out/package.json'))
