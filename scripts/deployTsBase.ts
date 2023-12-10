import path from 'node:path'

const bunDeploy = async (pkgDirName: 'ts-base' | 'eslint-config') =>
  Bun.spawn(['bun', 'run', 'deploy'], {
    cwd: path.join(import.meta.dir, `../packages/${pkgDirName}`),
    stdout: 'inherit',
  })

await Promise.all([bunDeploy('ts-base'), bunDeploy('eslint-config')])
