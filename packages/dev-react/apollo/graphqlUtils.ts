/* eslint-disable unicorn/filename-case */
import type { IResolvers } from '@graphql-tools/utils'

import type { BatchLoadFn } from 'dataloader'
import DataLoader from 'dataloader'
import type { DocumentNode } from 'graphql'

export const createGraphQLSchema = (
  typeDef: DocumentNode,
  resolvers: IResolvers,
) => ({ typeDefs: [typeDef], resolvers })

export const createDataLoader = <K = unknown, V = unknown>(
  batchLoadFn: BatchLoadFn<K, V>,
) => {
  const loader = new DataLoader(batchLoadFn)

  return (root: K) => loader.load(root)
}
