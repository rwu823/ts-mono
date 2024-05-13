import path from 'node:path'

import fs from 'fs-extra'
import { defineConfig } from 'tsup'

import rootPkg from '../../package.json'
import pkg from './package.json'
import { copyList } from './src/share.js'

const parseJsonc = async <T extends Record<string, unknown>>(
  filePath: string,
) => {
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  return new Function(`return ${await fs.readFile(filePath, 'utf8')}`)() as T
}

export default defineConfig({
  entry: ['bin/create-ts-base.ts', 'src/share.ts'],
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

    const tsConfig = await parseJsonc<{
      compilerOptions?: {
        types?: string[]
      }
    }>('out/tsconfig.json')

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
          main: undefined,
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
        undefined,
        2,
      ),
    )
  },
})
