import { copy, mkdirp } from 'fs-extra'

import packageJSON from '../package.json'

const tsBasePath = `node_modules/${packageJSON.name}`

export const mkDirCopyFiles = async (dir: string) =>
  mkdirp(dir)
    .then(() => copy(`${tsBasePath}/${dir}`, dir))
    .catch(console.error)
