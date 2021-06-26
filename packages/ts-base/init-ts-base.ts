import c from 'chalk'
import path from 'path'

import packageJSON from './package.json'
import { mkdir, readFile } from './utils/fs'
import g from './utils/glob'
import { parseJSON, stringify } from './utils/JSON'
import write from './utils/write'

const tsBasePath = `node_modules/${packageJSON.name}`

Promise.all([
  g('.eslintrc.js'),
  g('*prettier*'),
  g('tsconfig.json'),
  g('.vscode/**'),
  g('jest.config.mjs'),
  g('.circleci/**'),
  g('.gitignore'),
  g('.gitattributes'),
  g('.env.ts'),
  g('.husky'),
]).then(
  async ([
    // tslints,
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
      console.log(`${c.cyan('.gitignore')} is already exist.`)
    } else {
      write(await readFile(`${tsBasePath}/.gitignore`)).to('.gitignore')
    }

    if (gitattr.length > 0) {
      console.log(`${c.cyan('.gitattributes')} is already exist.`)
    } else {
      write(await readFile(`${tsBasePath}/.gitattributes`)).to('.gitattributes')
    }

    if (envTs.length > 0) {
      console.log(`${c.cyan('.env.ts')} is already exist.`)
    } else {
      write('').to('.env.ts')
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
`).to('prettier.config.js')
    }

    /**
     * =tslint.json
     */
    // if (tslints.length) {
    //   console.log(`${c.cyan('tslint.json')} is already exist.`)
    // } else {
    //   write(stringify({ extends: [`${packageJSON.name}/tslint`] })).to(
    //     'tslint.json',
    //   )
    // }

    // = eslintrc
    if (eslintrc.length > 0) {
      console.log(`${c.cyan('.esintrc.js')} is already exist.`)
    } else {
      write(
        `${stringify({
          root: true,
          extends: [`@ts-mono`],
        })}`,
      ).to('.eslintrc')
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
        // await readFile(`node_modules/${packageJSON.name}/tsconfig.json`),
      ).to('tsconfig.json')
    }

    /**
     * =package.json
     */
    const pkg = parseJSON<any>(await readFile('package.json'))

    if (!pkg.scripts) {
      pkg.scripts = {}
    }

    // TODO: for husky v4
    // if (!pkg.husky || !pkg.husky.hooks || !pkg.husky.hooks['pre-commit']) {
    //   Object.assign(pkg, {
    //     husky: {
    //       hooks: {
    //         'pre-commit': 'ts-check && lint-staged',
    //       },
    //     },
    //   })
    // }

    if (jestConf.length > 0) {
      console.log(`${c.cyan('jest.config.mjs')} is already exist.`)
    } else {
      write(await readFile(`${tsBasePath}/jest.config.mjs`)).to(
        'jest.config.mjs',
      )
    }

    if (!pkg['lint-staged']) {
      Object.assign(pkg, {
        'lint-staged': {
          '*.{ts,tsx,js}': ['eslint --fix'],
        },
      })
    }

    // Object.assign(pkg.scripts, {
    //   transcrypt: transcrypt,
    // })

    write(stringify(pkg)).to('package.json')

    /**
     * .vscode
     */
    if (vscode.length > 0) {
      console.log(`${c.cyan(vscode[0])} is already exist.`)
    } else {
      const dir = '.vscode'
      await mkdir(dir)
      ;(await g(`${tsBasePath}/${dir}/**`)).forEach(async (file) => {
        const baseFile = path.basename(file)
        write(await readFile(file)).to(`${dir}/${baseFile}`)
      })
    }

    if (husky.length > 0) {
      console.log(`${c.cyan(husky[0])} is already exist.`)
    } else {
      const dir = '.husky'
      await mkdir(dir)

      const files = await g(`${tsBasePath}/${dir}/**`)

      // eslint-disable-next-line no-restricted-syntax
      for (const file of files) {
        readFile(file).then((text) => {
          write(text).to(`${dir}/${path.basename(file)}`)
        })
      }
    }

    /**
     * .circleci/config.yml
     */
    if (circleCIConf.length > 0) {
      console.log(`${c.cyan(circleCIConf[0])} is already exist.`)
    } else {
      const dir = '.circleci'
      await mkdir(dir)

      const files = await g(`${tsBasePath}/${dir}/**`)

      // eslint-disable-next-line no-restricted-syntax
      for (const file of files) {
        readFile(file).then((text) => {
          write(text).to(`${dir}/${path.basename(file)}`)
        })
      }
    }
  },
)

process.on('unhandledRejection', (r) => {
  if (r instanceof Error) {
    console.log(r.stack)
  }
})
