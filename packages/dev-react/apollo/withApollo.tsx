import { HttpLink } from 'apollo-boost'
import fetch from 'isomorphic-unfetch'
import { createApolloClient } from './createApolloClient'
import * as Mutation from './Mutation'
import * as Query from './Query'

export const { withApollo, apolloClient } = createApolloClient({
  resolvers: {
    Query,
    Mutation,
  },
  // typeDefs,
  link: new HttpLink({
    uri: 'https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn', // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    fetch,
  }),
  assumeImmutableResults: false,
})
