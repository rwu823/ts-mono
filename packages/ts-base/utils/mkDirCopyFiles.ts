import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { copy, mkdirp } from 'fs-extra'
import c from 'picocolors'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const tsBasePath = path.resolve(__dirname, '../')

export const mkDirCopyFiles = (dir: string) =>
  mkdirp(dir)
    .then(() => {
      console.log(
        `Copied from ${c.green(`${tsBasePath}/${dir}/`)} to ${c.cyan(
          `${dir}/`,
        )}`,
      )
      return copy(`${tsBasePath}/${dir}`, dir)
    })
    .catch(console.error)
