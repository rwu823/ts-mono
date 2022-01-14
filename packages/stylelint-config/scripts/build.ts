import { stringify } from '@ts-mono/ts-base/utils/json'
import write from '@ts-mono/ts-base/utils/write'

// eslint-disable-next-line import/no-relative-packages
import rootPkgJSON from '../../../package.json'
import originalPkgJSON from '../package.json'

const pickStyleLintPackages: Record<string, string> = {}

for (const [key, version] of Object.entries(rootPkgJSON.devDependencies)) {
  if (/(^stylelint$|^stylelint-|^@stylelint|^postcss-)/.test(key)) {
    pickStyleLintPackages[key] = version
  }
}

Promise.resolve()
  .then(() => {
    originalPkgJSON.dependencies = pickStyleLintPackages

    return originalPkgJSON
  })

  .then(() => write(stringify(originalPkgJSON)).to('out/package.json'))
