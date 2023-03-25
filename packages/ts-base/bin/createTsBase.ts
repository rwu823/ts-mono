#!/usr/bin/env node

import { exec } from 'node:child_process'
import fs from 'node:fs/promises'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

import * as cli from '@clack/prompts'

import { copy } from 'fs-extra'
import c from 'picocolors'

import { copyList } from './share.js'

const execPromisify = promisify(exec)

const require = createRequire(import.meta.url)

const packageJSON = require(process.env.DEV
  ? '../out/package.json'
  : '../package.json')

const cliBaseDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  process.env.DEV ? '../out' : '..',
)

const mkDir = async (dir: string) => {
  await fs.mkdir(dir, { recursive: true })
  cli.log.success(`Created!\n${c.dim(path.resolve(c.yellow(dir)))}`)
}

const checkDirTypes = (
  dir: any,
): dir is { appName: string; dest: string; isExists: boolean } => {
  return (
    dir &&
    typeof dir === 'object' &&
    'appName' in dir &&
    'dest' in dir &&
    'isExists' in dir
  )
}

await cli.group(
  {
    start: () => cli.intro(c.bgCyan(` ${packageJSON.name} `.toUpperCase())),
    appName: () => {
      const initialValue =
        process.argv.length > 2 ? process.argv.at(-1) : undefined

      return cli.text({
        message: 'App name?',
        placeholder: 'ts-base-app',
        initialValue,
        validate(value) {
          if (value.length === 0) return `required`
        },
      })
    },
    dir: async ({ results: { appName } }) => {
      appName = String(appName).toString()
      const dest = path.resolve(appName)

      const isExists = await fs
        .stat(dest)
        .then(() => true)
        .catch(() => false)

      return {
        appName,
        dest,
        isExists,
      }
    },

    mkdir: async ({ results: { dir } }) => {
      if (!checkDirTypes(dir)) return

      if (dir.isExists) {
        cli.log.error(`${dir.dest} is exists.`)

        const isForce = await cli.confirm({
          message: `Do you want to force create?`,
        })

        if (isForce) {
          await mkDir(dir.appName)
        } else {
          process.exit(0)
        }
      } else {
        await mkDir(dir.appName)
      }
    },

    // packageManager: async () => {
    //   const pkgManager = await cli.select({
    //     message: 'Package manager?',
    //     options: ['npm', 'yarn', 'pnpm'].map((label) => ({
    //       label,
    //       value: label,
    //     })),
    //   })

    //   return pkgManager
    // },

    install: async ({ results: { dir } }) => {
      if (!checkDirTypes(dir)) return

      const spinner = cli.spinner()
      console.log(dir.dest)
      await Promise.all([
        ...copyList.map((src) =>
          copy(path.join(cliBaseDir, src), `${dir.dest}/${src}`).then(
            () => src,
          ),
        ),

        fs
          .writeFile(
            path.join(dir.dest, 'package.json'),
            JSON.stringify(
              {
                ...packageJSON,
                name: dir.appName,
                version: '0.0.1',
                bin: {},
                dependencies: {},
              },
              null,
              2,
            ),
          )
          .then(() => 'package.json'),

        fs
          .writeFile(
            path.join(dir.dest, '.gitignore'),
            ['node_modules', 'out'].join('\n'),
          )
          .then(() => '.gitignore'),

        fs
          .writeFile(
            path.join(dir.dest, '.eslintrc.cjs'),
            `module.exports = {
      root: true,
      extends: ['@ts-mono'],
    }`,
          )
          .then(() => '.eslintrc.cjs'),
      ]).then((files) => {
        cli.log.success(
          `Created files:\n${files
            .flat()
            .map((file) => `- ${c.cyan(file)}\n`)
            .join('')}`,
        )
      })

      spinner.start('Installing')

      const { stdout } = await execPromisify(
        `pnpm install -wD ${[
          'rwu823/ts-mono#pkg/eslint-config',
          'husky',
          'eslint',
          'lint-staged',
          'yarnhook',
          'typescript',
          '@types/node',
        ].join(' ')}
          `,
        { cwd: dir.dest },
      )

      spinner.stop(stdout)
    },

    initGit: async ({ results: { dir } }) => {
      if (!checkDirTypes(dir)) return

      const spinner = cli.spinner()

      spinner.start('Init git and husky')
      const { stdout } = await execPromisify(
        `git init
      npx husky install
      npx husky add .husky/pre-commit "npx lint-staged -c package.json"
      ${['checkout', 'merge', 'rewrite']
        .map((hook) => `npx husky add .husky/post-${hook} "npx yarnhook"`)
        .join('\n')}
      `,
        { cwd: dir.dest },
      )

      spinner.stop(stdout)
    },

    end: () => cli.outro(`✨You're all done!`),
  },
  {
    onCancel() {
      cli.cancel()
      process.exit(0)
    },
  },
)
