import { createGraphQLSchema } from '@ts-mono/dev-react/apollo/graphqlUtils'

import { gql } from 'apollo-server-micro'

export default createGraphQLSchema(
  gql`
    type Query {
      book: Book
    }

    type Book {
      title: String
    }
  `,
  {
    Query: {
      book: () => {},
    },
  },
)
