import { promisify } from 'util'
import fs, { PathLike } from 'fs'

export const readFile = (
  path: PathLike,
  options?: { encoding?: null; flag?: string },
) => promisify(fs.readFile)(path, options).then((buf: Buffer) => buf.toString())

export const exists = promisify(fs.exists)
export const mkdir = promisify(fs.mkdir)
