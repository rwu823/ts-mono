import { HttpLink } from 'apollo-boost'

import { createApolloClient } from './createApolloClient'
import { addTodo, toggleTodo } from './Mutation'
import * as Query from './Query'

export const { withApollo, apolloClient } = createApolloClient({
  resolvers: {
    Query,
    Mutation: {
      addTodo,
      toggleTodo,
    },
  },
  // typeDefs,
  link: new HttpLink({
    uri: 'https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn', // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
  }),
  assumeImmutableResults: false,
})
