import {
  $cacheControl,
  createGraphQLSchema,
} from '@ts-mono/dev-react/apollo/graphqlUtils'

import { gql } from 'apollo-server-micro'

export default createGraphQLSchema(
  gql`
    type Query {
      ok: Boolean
    }
  `,
  {
    Query: {
      ok: () => true,
    },
  },
)
