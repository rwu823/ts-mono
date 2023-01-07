import { writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import cpy from 'cpy'

const dirName = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

cpy(
  [
    'pages/',
    'hooks/.eslintrc',
    'hooks/useObservable.ts',
    'components/Box.tsx',

    '.storybook',
    '.swcrc',
    'server.ts',
    'next.config.js',
    'package.json',
    // 'theme/',
    // 'emotion.d.ts',
  ],
  'out',
  {
    cwd: dirName,
  },
).then(() => {
  const require = createRequire(import.meta.url)
  const pkg = require('../out/package.json')
  delete pkg.devDependencies

  writeFileSync('out/package.json', JSON.stringify(pkg, null, 2))
})
