import path from 'node:path'

import sh from 'sh-exec'

import pkg from '../package.json'

const { DIR = 'out', BRANCH = path.basename(process.cwd()) } = process.env

sh`
  cd ${DIR}

  git init
  git add .
  git commit -nm update
  git push ${pkg.repository} HEAD:pkg/${BRANCH} -f
`
