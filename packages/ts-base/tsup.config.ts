import { defineConfig } from 'tsup'

import { copyFiles } from './scripts/build.js'

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
  onSuccess: copyFiles,
})
