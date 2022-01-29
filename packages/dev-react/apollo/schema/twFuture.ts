import { createGraphQLSchema } from '@ts-mono/dev-react/apollo/graphqlUtils'
import { fetch } from '@ts-mono/dev-react/utils/fetch'

import { gql } from 'apollo-server-micro'

export default createGraphQLSchema(
  gql`
    type TWFuture {
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
    }

    type Query {
      twFuture(isNight: Boolean): TWFuture
    }
  `,
  {
    Query: {
      twFuture: async (_, { isNight }: { isNight: boolean }) => {
        const json = await fetch(
          `https://www.wantgoo.com/stock/techchart/realtimedata?${new URLSearchParams(
            {
              stockNo: isNight ? 'WTXP&' : 'WTX&',
              topDays: '1',
            },
          )}`,

          {
            headers: {
              // 'user-agent': '*',
            },
          },
        )

        return json.StockInfo
      },
    },
  },
)
