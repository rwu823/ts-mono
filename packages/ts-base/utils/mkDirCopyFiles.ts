import { copy, mkdirp } from 'fs-extra'
import path from 'node:path'
import c from 'picocolors'

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
