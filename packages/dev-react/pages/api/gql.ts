import { NextApiHandler } from 'next'

import { IResolvers } from '@graphql-tools/utils'

import { ApolloServer, gql } from 'apollo-server-micro'
import fetch from 'isomorphic-fetch'

const typeDefs = gql`
  type StockInfo {
    Id: String
    Name: String
    Market: Int
    Open: Int
    High: Int
    Low: Int
    Close: Int
    PreviousClose: Int
    Change: Int
    ChangePercent: Float
    CommodityId: String
    TotalVolume: Int
    Time: String
    Mean60Distance: Float
    Mean60DistanceRate: Float
  }

  type Query {
    twFuture: StockInfo
  }
`

const resolvers: IResolvers = {
  Query: {
    twFuture: async () => {
      const json = await fetch(
        `https://www.wantgoo.com/stock/techchart/realtimedata?stockNo=WTX%26&topDays=1`,
      ).then((res) => res.json())

      return json.StockInfo
    },
  },
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

const startServer = apolloServer.start()

export default (async (req, res) => {
  res
    .setHeader('Access-Control-Allow-Credentials', 'true')

    .setHeader(
      'Access-Control-Allow-Origin',
      'https://studio.apollographql.com',
    )
    .setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    )

  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  return startServer.then(() =>
    apolloServer.createHandler({
      path: '/api/gql',
    })(req, res),
  )
}) as NextApiHandler

export const config = {
  api: {
    bodyParser: false,
  },
}
