import { gqlExplorer } from '@ts-mono/dev-react/apollo/gqlExplorer'
import schema from '@ts-mono/dev-react/apollo/schema'

import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-micro'

const apolloServer = new ApolloServer({
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      settings: {
        // 'tracing.hideTracingResponse': false,
      },
    }),
  ],
  introspection: true,
  ...schema,
})

export default gqlExplorer(apolloServer)

export const config = {
  api: {
    bodyParser: false,
  },
}
