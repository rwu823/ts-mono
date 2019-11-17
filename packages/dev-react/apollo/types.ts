import { ApolloClientOptions } from 'apollo-boost'

export type Mutation<Variables extends object> = (
  root: any,
  vars: Variables,
  ctx: {
    cache: ApolloClientOptions<{}>['cache']
    getCacheKey: <T>(obj: { __typename: string; id: string | number }) => T
  },
) => any

export type Resolver = {
  Query?: {
    [key: string]: () => any
  }

  Mutation?: {
    [key: string]: any
  }
}
