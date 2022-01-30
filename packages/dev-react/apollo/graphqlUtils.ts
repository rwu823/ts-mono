/* eslint-disable unicorn/filename-case */
import type { IResolvers } from '@graphql-tools/utils'

import type { CacheScope } from 'apollo-server-types'
import type { BatchLoadFn } from 'dataloader'
import DataLoader from 'dataloader'
import type { DocumentNode } from 'graphql'

export const createGraphQLSchema = (
  typeDef: DocumentNode,
  resolvers: IResolvers = {},
) => ({ typeDefs: [typeDef], resolvers })

export const createDataLoader = <K = unknown, V = unknown>(
  batchLoadFn: BatchLoadFn<K, V>,
) => {
  const loader = new DataLoader(batchLoadFn)

  return (root: K) => loader.load(root)
}

type CacheControlArgs = {
  maxAge: number
  scope?: CacheScope
}

export const $cacheControl = (args: CacheControlArgs) => {
  let string = ''

  for (const [k, v] of Object.entries(args)) {
    string += `${k}: ${v},`
  }
  return `@cacheControl(${string})`
}

$cacheControl.minutes = 60
$cacheControl.hours = $cacheControl.minutes * 60
$cacheControl.days = $cacheControl.hours * 24

export { CacheScope } from 'apollo-server-types'
