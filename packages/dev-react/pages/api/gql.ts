import { gqlExplorer } from '@ts-mono/dev-react/apollo/gqlExplorer'
import schema from '@ts-mono/dev-react/apollo/schema'

import {
  ApolloServerPluginCacheControl,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-micro'
import responseCachePlugin from 'apollo-server-plugin-response-cache'

const apolloServer = new ApolloServer({
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      settings: {
        // 'tracing.hideTracingResponse': false,
      },
    }),
    ApolloServerPluginCacheControl({ defaultMaxAge: 5 }),

    responseCachePlugin({
      sessionId: (requestContext) =>
        requestContext.request.http?.headers.get('session-id') ?? null,
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
