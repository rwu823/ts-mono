import { exec, spawn } from 'child_process'
import { promisify } from 'node:util'
import c from 'picocolors'

import packageJSON from './package.json'
import { readFile } from './utils/fs'
import fg from './utils/glob'
import { parseJSON, stringify } from './utils/json'
import { mkDirCopyFiles } from './utils/mkDirCopyFiles'
import write from './utils/write'

const execPromisify = promisify(exec)

const tsBasePath = __dirname

const ESLINTRC = '.eslintrc'
const PRETTIER = 'prettier'
const TSCONFIG = 'tsconfig.json'
const VSCODE = '.vscode'
const JEST_CONFIG = 'jest.config.ts'
const CIRCLE_CI = '.circleci'
const GIT_IGNORE = '.gitignore'
const GIT_ATTRIBUTES = '.gitattributes'
const HUSKY = '.husky'
const ENV = '.env.ts'
const STYLE_LINT = 'stylelint'
const TYPES = '@types'
const BROWSER_LIST_RC = '.browserslistrc'

const log = (string: string) =>
  console.log(c.bgGreen(c.black(' init-ts-base '.toUpperCase())), string)

Promise.all([
  fg(`${ESLINTRC}*`),
  fg(`*${PRETTIER}*`),
  fg(TSCONFIG),
  fg(`${VSCODE}/**`),
  fg(JEST_CONFIG),
  fg(`${CIRCLE_CI}/**`),
  fg(GIT_IGNORE),
  fg(GIT_ATTRIBUTES),
  fg(ENV),
  fg(HUSKY),
  fg(`*${STYLE_LINT}*`),
  fg(TYPES),
  fg(BROWSER_LIST_RC),
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
    styleLintConfigs,
    globalTypes,
    browserslist,
  ]) => {
    circleCIConf
    log('Copy files.')
    if (browserslist.length > 0) {
      console.log(`${c.cyan(BROWSER_LIST_RC)} is already exist.`)
    } else {
      await write(await readFile(`${tsBasePath}/${BROWSER_LIST_RC}`)).to(
        BROWSER_LIST_RC,
      )
    }

    if (gitignore.length > 0) {
      console.log(`${c.cyan(GIT_IGNORE)} is already exist.`)
    } else {
      await write(await readFile(`${tsBasePath}/${GIT_IGNORE}`)).to(GIT_IGNORE)
    }

    if (gitattr.length > 0) {
      console.log(`${c.cyan(GIT_ATTRIBUTES)} is already exist.`)
    } else {
      await write(await readFile(`${tsBasePath}/${GIT_ATTRIBUTES}`)).to(
        GIT_ATTRIBUTES,
      )
    }

    if (envTs.length > 0) {
      console.log(`${c.cyan(ENV)} is already exist.`)
    } else {
      await write('').to(ENV)
    }
    /**
     * =prettier.config.js
     */
    if (prettiers.length > 0) {
      console.log(`${c.cyan(prettiers[0])} is already exist.`)
    } else {
      await write(`const base = require('${packageJSON.name}/prettier.config')

module.exports = {
  ...base,
}
`).to(`${PRETTIER}.config.js`)
    }

    // = eslintrc
    if (eslintrc.length > 0) {
      console.log(`${c.cyan(eslintrc[0])} is already exist.`)
    } else {
      await write(
        `${stringify({
          root: true,
          extends: [`@ts-mono`],
        })}`,
      ).to(ESLINTRC)
    }

    if (styleLintConfigs.length > 0) {
      console.log(`${c.cyan(styleLintConfigs[0])} is already exist.`)
    } else {
      write(`module.exports = { extends: ['@ts-mono/stylelint-config'] }`).to(
        `${STYLE_LINT}.config.js`,
      )
    }

    /**
     * =tsconfig.json
     */
    if (tsconfigs.length > 0) {
      console.log(`${c.cyan('tsconfig.json')} is already exist.`)
    } else {
      await write(
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
    await execPromisify(`yarn init -y`)
    const pkg = parseJSON<{
      scripts: Record<string, string>
      'lint-staged': Record<string, JSON>
    }>(await readFile('package.json'))

    Object.assign(pkg, {
      'lint-staged': packageJSON['lint-staged'],
      scripts: packageJSON.scripts,
    })

    await write(stringify(pkg)).to('package.json')

    if (jestConf.length > 0) {
      console.log(`${c.cyan(JEST_CONFIG)} is already exist.`)
    } else {
      await write(await readFile(`${tsBasePath}/${JEST_CONFIG}`)).to(
        JEST_CONFIG,
      )
    }

    /**
     * @types
     */
    if (globalTypes.length > 0) {
      console.log(`${c.cyan(globalTypes[0])} is already exist.`)
    } else {
      await mkDirCopyFiles(TYPES)
    }

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
      log(`Init git repo and husky.`)
      const { stdout } = await execPromisify(`
git init
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
`)
      console.log(stdout)
    }

    log(`Installing packages.`)
    // install dev dependencies
    spawn(
      'pnpm',
      [
        'install',
        '-WD',

        // eslint-disable-next-line unicorn/no-useless-spread
        ...[
          'rwu823/ts-mono#pkg/eslint-config',
          'rwu823/ts-mono#pkg/stylelint-config',
          'husky',
          'lint-staged',
          'ts-node',
          'typescript',
          '@types/node',
        ],
      ],
      { stdio: 'inherit' },
    )
    /**
     * .circleci/config.yml
     */
    // if (circleCIConf.length > 0) {
    //   console.log(`${c.cyan(circleCIConf[0])} is already exist.`)
    // } else {
    //   await mkDirCopyFiles(CIRCLE_CI)
    // }
  },
)

process.on('unhandledRejection', (r) => {
  if (r instanceof Error) {
    console.error(r.stack)
  }
})
