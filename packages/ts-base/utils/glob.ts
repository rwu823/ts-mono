import type { Options } from 'fast-glob'
import fg from 'fast-glob'

export default (pattern: string | string[], opts?: Options) =>
  fg(pattern, {
    dot: true,
    suppressErrors: true,
    ...opts,
  })
