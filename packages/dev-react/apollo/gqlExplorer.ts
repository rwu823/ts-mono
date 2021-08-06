import { NextApiHandler } from 'next'

import { ApolloServer } from 'apollo-server-micro'

export const gqlExplorer: (apolloServer: ApolloServer) => NextApiHandler = (
  apolloServer,
) => {
  const startApolloServer = apolloServer.start()

  return (req, res) => {
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
      return res.end()
    }

    return startApolloServer.then(() =>
      apolloServer.createHandler({
        path: url,
      })(req, res),
    )
  }
}
