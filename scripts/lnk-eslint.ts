import fs from 'fs'
import path from 'path'
import pkg from '../package.json'

// base ../ scope../ node_modules ../ project root
const cwd = (...args: string[]) => path.join(...Array(3).fill('../'), ...args)

const [scope, name] = pkg.name.split('/')
const isExists = (p: string) => {
  try {
    fs.statSync(p)
    return true
  } catch (er) {
    return false
  }
}
const eslintPath = cwd(`/node_modules/${pkg.name}`)

if (isExists(cwd(`/node_modules/${pkg.name}`)) && !isExists(eslintPath)) {
  fs.symlink(`./${name}/eslint-config-ts-base`, eslintPath, error => {
    if (error) {
      console.log(error)
    }
  })
}
