import { NextApiHandler } from 'next'

import { fetch } from '@ts-mono/dev-react/utils/fetch'

import { IResolvers } from '@graphql-tools/utils'

import { ApolloServer, gql } from 'apollo-server-micro'

const StockInfo = gql`
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
`

const resolvers: IResolvers = {
  Query: {
    twFuture: async (_, { isNight }: { isNight: boolean }) => {
      const qs = new URLSearchParams({
        stockNo: isNight ? 'WTXP&' : 'WTX&',
        topDays: '1',
      })

      const json = await fetch(
        `https://www.wantgoo.com/stock/techchart/realtimedata?${qs.toString()}`,
      )

      return json.StockInfo
    },
  },
}

const apolloServer = new ApolloServer({
  plugins: [],
  typeDefs: gql`
    enum CacheControlScope {
      PUBLIC
      PRIVATE
    }

    directive @cacheControl(
      maxAge: Int
      scope: CacheControlScope
      inheritMaxAge: Boolean
    ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION

    ${StockInfo}

    type Query {
      twFuture(isNight: Boolean): StockInfo
    }
  `,
  resolvers,
})

const startServer = apolloServer.start()

export default (async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com',
  )
  res.setHeader(
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
