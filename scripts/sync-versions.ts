/* eslint-disable unicorn/filename-case */

import fs from 'node:fs/promises'
import { createRequire } from 'node:module'
import path from 'node:path'

const rootRequire = createRequire(path.join(import.meta.url, '..'))
const rootPkgJson = rootRequire('./package.json')

await fs.readdir('packages').then((packages) =>
  Promise.all(packages.map((pkg) => fs.stat(`packages/${pkg}`))).then(
    (packagesStat) => {
      for (const [i, pkg] of packages.entries()) {
        if (!packagesStat[i]?.isDirectory()) continue

        const pkgJson = rootRequire(`./packages/${pkg}/package.json`)

        pkgJson.version = rootPkgJson.version

        fs.writeFile(
          `packages/${pkg}/package.json`,
          `${JSON.stringify(
            {
              ...pkgJson,
              version: rootPkgJson.version,
            },
            undefined,
            2,
          )}\n`,
        )
      }
    },
  ),
)
