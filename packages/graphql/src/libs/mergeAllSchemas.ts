import merge from 'deepmerge'

import type { makeSchema } from './makeSchema.js'

export const mergeAllSchemas = (...schemas: ReturnType<typeof makeSchema>[]) =>
  merge.all(schemas)
