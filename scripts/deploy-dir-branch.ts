import path from 'node:path'

import sh from 'sh-exec'

import rootPkg from '../package.json'

const { DIR = 'out', BRANCH = path.basename(process.cwd()) } = process.env

await sh`
  cd ${DIR}

  git init
  git add .
  git commit -nm update
  git push ${rootPkg.repository} HEAD:pkg/${BRANCH} -f
`
