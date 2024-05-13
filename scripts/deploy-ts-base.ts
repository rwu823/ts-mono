import path from 'node:path'

const bunDeploy = (pkgDirName: 'ts-base' | 'eslint-config') =>
  Bun.spawn(['bun', 'run', 'deploy'], {
    cwd: path.join(import.meta.dir, `../packages/${pkgDirName}`),
    stdout: 'inherit',
  })

Bun.spawnSync(['bun', 'run', 'scripts/sync-versions.ts'])
await Promise.all([bunDeploy('ts-base'), bunDeploy('eslint-config')])
