import { gqlExplorer } from '@ts-mono/dev-react/apollo/gqlExplorer'
import { fetch } from '@ts-mono/dev-react/utils/fetch'

import { IResolvers } from '@graphql-tools/utils'

import { ApolloServerPluginLandingPageDisabled } from 'apollo-server-core'
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
  plugins: [ApolloServerPluginLandingPageDisabled()],
  introspection: true,
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

export default gqlExplorer(apolloServer)

export const config = {
  api: {
    bodyParser: false,
  },
}
