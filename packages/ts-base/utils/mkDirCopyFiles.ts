import c from 'colorette'
import { copy, mkdirp } from 'fs-extra'

import packageJSON from '../package.json'

const tsBasePath = `node_modules/${packageJSON.name}`

export const mkDirCopyFiles = async (dir: string) =>
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
