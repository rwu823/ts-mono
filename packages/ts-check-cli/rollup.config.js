import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

export default {
  input: 'index.ts',
  external: Object.keys(pkg.dependencies),

  plugins: [
    typescript({
      cacheRoot: './node_modules/.cache/rts2_cache',
      tsconfigOverride: {
        compilerOptions: {
          module: 'esnext',
        },
      },
    }),
  ],
  output: {
    format: 'cjs',
    file: 'out/index.js',
  },
}
