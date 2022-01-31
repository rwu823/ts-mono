/* eslint-disable unicorn/filename-case */

import type { IResolvers } from '@graphql-tools/utils'

import { gql } from 'apollo-server-micro'
import type { CacheScope } from 'apollo-server-types'
import type { BatchLoadFn } from 'dataloader'
import DataLoader from 'dataloader'
import type { DocumentNode, GraphQLResolveInfo } from 'graphql'

export const createGraphQLResolver =
  // init

  <ApolloServerContext = unknown>() => {
    type Args<Parent = unknown, Vars = unknown> = {
      parent: Parent
      vars: Vars
      ctx: ApolloServerContext
      info: GraphQLResolveInfo
    }

    const make = <Parent = unknown, Vars = unknown>(
      batchLoadFn: (args: readonly Args<Parent, Vars>[]) => Promise<any[]>,

      { debug = false } = {},
    ) =>
      // resolver
      {
        const dataloader = new DataLoader<Args<Parent, Vars>, unknown[]>(
          (keys) => {
            if (debug)
              console.debug(
                `[GraphQL]`,
                new Date(),
                `load batch: ${keys.length} counts`,
              )

            return batchLoadFn(keys)
          },
        )

        return (
          parent: Parent,
          vars: Vars,
          ctx: ApolloServerContext,
          info: GraphQLResolveInfo,
        ) => {
          if (debug)
            console.debug(
              `[GraphQL]`,
              new Date(),
              `load field: ${info.fieldName}`,
            )
          return dataloader.load({ parent, vars, ctx, info })
        }
      }

    return make
  }

export const createGraphQLSchema =
  <ApolloServerContext = unknown>() =>
  (
    getNode: (gqlTag: typeof gql) => DocumentNode,
    resolvers: IResolvers<unknown, ApolloServerContext> = {},
  ) => ({ typeDefs: [getNode(gql)], resolvers })

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
