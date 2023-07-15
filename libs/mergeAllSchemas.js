import merge from 'deepmerge';
export const mergeAllSchemas = (...schemas) => merge.all(schemas);
