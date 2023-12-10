/* eslint-disable unicorn/filename-case */

import fs from 'node:fs/promises'

import rootPkgJson from '../package.json'

await fs.readdir('packages').then((packages) =>
  Promise.all(packages.map((pkg) => fs.stat(`packages/${pkg}`))).then(
    (packagesStat) => {
      for (const [i, pkg] of packages.entries()) {
        if (!packagesStat[i]?.isDirectory()) continue

        import(`../packages/${pkg}/package.json`).then(
          ({ default: pkgJson }) => {
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
          },
        )
      }
    },
  ),
)
