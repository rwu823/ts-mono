import fg, { Options } from 'fast-glob'

export default (pattern: string | string[], opts?: Options) =>
  fg(pattern, {
    dot: true,
    suppressErrors: true,
    ...opts,
  })
