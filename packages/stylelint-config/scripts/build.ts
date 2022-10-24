import { stringify } from '@ts-mono/ts-base/utils/json'
import write from '@ts-mono/ts-base/utils/write'

import rootPkgJSON from '../../../package.json'
import originalPkgJSON from '../package.json'

const pickStyleLintPackages: Record<string, string> = {}

for (const [key, version] of Object.entries(rootPkgJSON.devDependencies)) {
  if (/(^stylelint|^postcss-)/.test(key)) {
    pickStyleLintPackages[key] = version
  }
}

Object.assign(originalPkgJSON.dependencies, pickStyleLintPackages)

write(stringify(originalPkgJSON)).to('out/package.json')
