import { NextApiRequest, NextApiResponse } from 'next'

import DataSourcesGitHubRaw from '@ts-mono/dev-react/apollo/DataSourcesGitHubRaw'
import { gqlExplorer } from '@ts-mono/dev-react/apollo/gqlExplorer'
import schema from '@ts-mono/dev-react/schema'

import {
  ApolloServerPluginCacheControl,
  ApolloServerPluginLandingPageGraphQLPlayground,
  AuthenticationError,
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

  dataSources: () => ({
    githubRaw: new DataSourcesGitHubRaw(),
  }),

  context: ({ req }: { req: NextApiRequest; res: NextApiResponse }) => {
    if (req.headers.authorization !== '123456')
      throw new AuthenticationError('Authentication Error')
  },

  introspection: true,
  ...schema,
})

export default gqlExplorer(apolloServer)

export const config = {
  api: {
    bodyParser: false,
  },
}
