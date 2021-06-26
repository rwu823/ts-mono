import g from 'fast-glob'
import path from 'path'

import packageJSON from '../package.json'
import { mkdir, readFile } from './fs'
import write from './write'

const tsBasePath = `node_modules/${packageJSON.name}`

export const mkDirCopyFiles = async (dir: string) => {
  await mkdir(dir)

  const files = await g(`${tsBasePath}/${dir}/**`)

  for (const file of files) {
    readFile(file).then((text) => {
      write(text).to(`${dir}/${path.basename(file)}`)
    })
  }
}
