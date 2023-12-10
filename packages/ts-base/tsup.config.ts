import path from 'node:path'

import fs from 'fs-extra'
import { defineConfig } from 'tsup'

import rootPkg from '../../package.json'
import pkg from './package.json'
import { copyList } from './src/share.js'

export default defineConfig({
  entry: ['bin/createTsBase.ts', 'src/share.ts'],
  outDir: 'out',
  // treeshake: true,
  format: ['esm'],
  target: 'esnext',
  skipNodeModulesBundle: true,
  splitting: true,
  sourcemap: false,
  bundle: false,
  clean: true,
  esbuildOptions(options) {
    options.outbase = '.'
  },
  onSuccess: async () => {
    const root = '../..'

    await Promise.all(
      copyList.map((file) => {
        return fs.copy(path.resolve(root, file), `out/${file}`)
      }),
    )

    const tsConfig = new Function(
      `return ${await fs.readFile('out/tsconfig.json', 'utf8')}`,
    )()

    const omitScriptsFieldsSet = new Set(['prepare', 'postinstall'])
    if (tsConfig?.compilerOptions?.types) {
      delete tsConfig.compilerOptions.types
    }

    await fs.writeFile(
      'out/tsconfig.json',
      JSON.stringify(tsConfig, undefined, 2),
    )

    // === extend package.json
    await fs.writeFile(
      'out/package.json',
      JSON.stringify(
        Object.assign(pkg, {
          version: rootPkg.version,
          'lint-staged': rootPkg['lint-staged'],
          'simple-git-hooks': rootPkg['simple-git-hooks'],
          browserslist: rootPkg.browserslist,
          scripts: Object.fromEntries(
            Object.entries(rootPkg.scripts).filter(([k]) => {
              return !omitScriptsFieldsSet.has(k)
            }),
          ),
        }),
        null,
        2,
      ),
    )
  },
})
