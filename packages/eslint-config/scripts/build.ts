import { stringify } from '@ts-mono/ts-base/utils/json'
import write from '@ts-mono/ts-base/utils/write'

import fg from 'fast-glob'
import fse from 'fs-extra'

// eslint-disable-next-line import/no-relative-packages
import rootPkgJSON from '../../../package.json'
import originalPkgJSON from '../package.json'

fse.removeSync('out')
fse.mkdirSync('out')

const pickEslintPackages: Record<string, string> = {}
for (const [pkgName, v] of Object.entries(rootPkgJSON.devDependencies)) {
  if (/(^prettier$|^eslint|^@typescript-eslint)/.test(pkgName)) {
    Object.assign(pickEslintPackages, { [pkgName]: v })
  }
}

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
