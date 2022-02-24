import type { NextApiHandler } from 'next'

import type { ApolloServer } from 'apollo-server-micro'

export const gqlExplorer = (apolloServer: ApolloServer): NextApiHandler => {
  const startApolloServer = apolloServer.start()

  return async (req, res) => {
    const { method, url } = req

    // res.setHeader('apollo-federation-include-trace', 'ftv1')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')

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
