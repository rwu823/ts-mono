import { gql } from '@apollo/client'
import { ApolloServer } from '@apollo/server'

import { startServerAndCreateNextHandler } from '@as-integrations/next'

const apolloServer = new ApolloServer({
  plugins: [],
  typeDefs: [
    gql`
      type Query {
        ok: Boolean!
      }
    `,
  ],
  resolvers: {
    Query: {
      ok: () => true,
    },
  },
  introspection: true,
})

export default startServerAndCreateNextHandler(apolloServer, {
  context: async (rea, res) => {},
})
