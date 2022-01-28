import { NextApiHandler } from 'next'

import type { ApolloServer } from 'apollo-server-micro'

export const gqlExplorer = (apolloServer: ApolloServer): NextApiHandler => {
  const startApolloServer = apolloServer.start()

  return async (req, res) => {
    const { method, url } = req

    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader(
      'Access-Control-Allow-Origin',
      'https://studio.apollographql.com',
    )
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    )

    if (method === 'OPTIONS') {
      res.end()

      return
    }

    await startApolloServer

    return apolloServer.createHandler({
      path: url,
    })(req, res)
  }
}
