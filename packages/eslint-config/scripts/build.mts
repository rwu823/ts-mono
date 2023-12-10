import { stringify } from '@rwu823/ts-base/src/json.js'
import write from '@rwu823/ts-base/src/write.js'

import fg from 'fast-glob'
import fs from 'fs-extra'

import rootPkgJSON from '../../../package.json'
import originalPkgJSON from '../package.json'

fs.removeSync('out')
fs.mkdirSync('out')

const pickEslintPackages: Record<string, string> = {}

for (const [pkgName, v] of Object.entries(rootPkgJSON.devDependencies)) {
  if (/(^prettier|^eslint|^@typescript-eslint)/.test(pkgName)) {
    Object.assign(pickEslintPackages, { [pkgName]: v })
  }
}

await Promise.all([
  fs.copy('rules', 'out/rules'),
  fs.copy('../../.eslintrc.cjs', 'out/.eslintrc.cjs'),
  ...fg.sync('./*').map((file) => fs.copy(file, `out/${file}`)),
]).then(() => {
  Object.assign(originalPkgJSON.dependencies, pickEslintPackages)

  write(stringify(originalPkgJSON)).to('out/package.json')
})
