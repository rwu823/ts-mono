import { stringify } from '@ts-mono/base/utils/json'
import write from '@ts-mono/base/utils/write'

import rootPkgJSON from '../../../package.json'
import originalPkgJSON from '../package.json'

const pickStyleLintPackages: Record<string, string> = {}

for (const [key, version] of Object.entries(rootPkgJSON.devDependencies)) {
  if (/(^stylelint$|^stylelint-)/.test(key)) {
    pickStyleLintPackages[key] = version
  }
}

Promise.resolve()
  .then(() => {
    originalPkgJSON.dependencies = pickStyleLintPackages

    return originalPkgJSON
  })

  .then(() => write(stringify(originalPkgJSON)).to('out/package.json'))
