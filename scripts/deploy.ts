import fg from 'fast-glob'
import sh from 'sh-exec'

const pkgs = fg.sync('./*', { onlyDirectories: true, cwd: 'packages' })

sh`
${pkgs.map((pkg) => `yarn workspace @ts-mono/${pkg} deploy`).join('\n')}
`
