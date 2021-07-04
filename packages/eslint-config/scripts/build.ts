import { stringify } from '@ts-mono/base/utils/json'
import write from '@ts-mono/base/utils/write'

import rootPkgJSON from '../../../package.json'
import originalPkgJSON from '../package.json'

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

Promise.resolve()
  .then(() => {
    originalPkgJSON.dependencies = pickEslintPackages

    return originalPkgJSON
  })

  .then(() => write(stringify(originalPkgJSON)).to('out/package.json'))
