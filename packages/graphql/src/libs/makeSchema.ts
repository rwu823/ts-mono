import type { IResolvers } from '@graphql-tools/utils'

import type { DocumentNode } from 'graphql'

import type { ResolverContext } from '../types.js'

export const makeSchema = (
  typeDef: DocumentNode | string,
  resolver?: IResolvers<any, ResolverContext>,
) => {
  return {
    typeDefs: [typeDef],
    resolvers: resolver ?? {},
  }
}
