import type { DocumentNode } from 'graphql'

export const makeSchema = <Resolvers extends Record<string, any>>(
  typeDef: DocumentNode | string,
  resolvers?: Resolvers,
) => {
  return {
    typeDefs: [typeDef],
    resolvers: resolvers ?? {},
  }
}
