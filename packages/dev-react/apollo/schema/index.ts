/* eslint-disable filenames/no-index */
import merge from 'deepmerge'

const requireContext = require.context('.', false, /\.ts$/)

const schema = []

for (const module of requireContext.keys()) {
  if (module.startsWith('./') && !module.endsWith('index.ts')) {
    schema.push(requireContext(module).default)
  }
}

export default merge.all(schema)
