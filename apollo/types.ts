import { ApolloClientOptions } from '@apollo/client'

export type Mutation<Variables extends Record<string, unknown>> = (
  root: unknown,
  vars: Variables,
  ctx: {
    cache: ApolloClientOptions<{}>['cache']
    getCacheKey: <T>(obj: { __typename: string; id: string | number }) => T
  },
) => unknown

export type Resolver = {
  Query?: {
    [key: string]: () => unknown
  }

  Mutation?: {
    [key: string]: unknown
  }
}
