import merge from 'deepmerge'

export const mergeAllSchemas = <T>(...schemas: T[]): T => merge.all<T>(schemas)
