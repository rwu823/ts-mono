import c from 'chalk'

import packageJSON from './package.json'
import { readFile } from './utils/fs'
import g from './utils/glob'
import { parseJSON, stringify } from './utils/json'
import { mkDirCopyFiles } from './utils/mkDirCopyFiles'
import write from './utils/write'

const tsBasePath = `node_modules/${packageJSON.name}`

const ESLINTRC = '.eslintrc'
const PRETTIER = 'prettier'
const TSCONFIG = 'tsconfig.json'
const VSCODE = '.vscode'
const JEST_CONFIG = 'jest.config.mjs'
const CIRCLE_CI = '.circleci'
const GIT_IGNORE = '.gitignore'
const GIT_ATTRIBUTES = '.gitattributes'
const HUSKY = '.husky'
const ENV = '.env.ts'

Promise.all([
  g(`${ESLINTRC}*`),
  g(`*${PRETTIER}*`),
  g(TSCONFIG),
  g(`${VSCODE}/**`),
  g(JEST_CONFIG),
  g(`${CIRCLE_CI}/**`),
  g(GIT_IGNORE),
  g(GIT_ATTRIBUTES),
  g(ENV),
  g(HUSKY),
]).then(
  async ([
    eslintrc,
    prettiers,
    tsconfigs,
    vscode,
    jestConf,
    circleCIConf,
    gitignore,
    gitattr,
    envTs,
    husky,
  ]) => {
    if (gitignore.length > 0) {
      console.log(`${c.cyan(GIT_IGNORE)} is already exist.`)
    } else {
      write(await readFile(`${tsBasePath}/${GIT_IGNORE}`)).to(GIT_IGNORE)
    }

    if (gitattr.length > 0) {
      console.log(`${c.cyan(GIT_ATTRIBUTES)} is already exist.`)
    } else {
      write(await readFile(`${tsBasePath}/${GIT_ATTRIBUTES}`)).to(
        GIT_ATTRIBUTES,
      )
    }

    if (envTs.length > 0) {
      console.log(`${c.cyan(ENV)} is already exist.`)
    } else {
      write('').to(ENV)
    }
    /**
     * =prettier.config.js
     */
    if (prettiers.length > 0) {
      console.log(`${c.cyan(prettiers[0])} is already exist.`)
    } else {
      write(`const base = require('${packageJSON.name}/prettier.config')

module.exports = {
  ...base,
}
`).to(`${PRETTIER}.config.js`)
    }

    // = eslintrc
    if (eslintrc.length > 0) {
      console.log(`${c.cyan(eslintrc[0])} is already exist.`)
    } else {
      write(
        `${stringify({
          root: true,
          extends: [`@ts-mono`],
        })}`,
      ).to(ESLINTRC)
    }

    /**
     * =tsconfig.json
     */
    if (tsconfigs.length > 0) {
      console.log(`${c.cyan('tsconfig.json')} is already exist.`)
    } else {
      write(
        stringify({
          extends: `${packageJSON.name}/tsconfig`,
          exclude: ['node_modules', 'out/**/*', '**/*.spec.ts', '**/*.test.ts'],
          compilerOptions: {
            outDir: 'out',
          },
        }),
      ).to(TSCONFIG)
    }

    /**
     * =package.json
     */
    const pkg = parseJSON<any>(await readFile('package.json'))

    if (!pkg.scripts) {
      pkg.scripts = {}
    }
    if (jestConf.length > 0) {
      console.log(`${c.cyan(JEST_CONFIG)} is already exist.`)
    } else {
      write(await readFile(`${tsBasePath}/${JEST_CONFIG}`)).to(JEST_CONFIG)
    }

    if (!pkg['lint-staged']) {
      Object.assign(pkg, {
        'lint-staged': {
          '*.{ts,tsx,js,mjs}': ['eslint --fix'],
        },
      })
    }

    write(stringify(pkg)).to('package.json')

    /**
     * .vscode
     */
    if (vscode.length > 0) {
      console.log(`${c.cyan(vscode[0])} is already exist.`)
    } else {
      await mkDirCopyFiles(VSCODE)
    }

    if (husky.length > 0) {
      console.log(`${c.cyan(husky[0])} is already exist.`)
    } else {
      await mkDirCopyFiles(HUSKY)
    }

    /**
     * .circleci/config.yml
     */
    if (circleCIConf.length > 0) {
      console.log(`${c.cyan(circleCIConf[0])} is already exist.`)
    } else {
      await mkDirCopyFiles(CIRCLE_CI)
    }
  },
)

process.on('unhandledRejection', (r) => {
  if (r instanceof Error) {
    console.error(r.stack)
  }
})
