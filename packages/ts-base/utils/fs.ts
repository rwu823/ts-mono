import fs, { PathLike } from 'fs'
import { promisify } from 'util'

export const readFile = (
  path: PathLike,
  options?: { encoding?: null; flag?: string },
) => promisify(fs.readFile)(path, options).then((buf: Buffer) => buf.toString())

export const exists = promisify(fs.exists)
export const mkdir = promisify(fs.mkdir)
