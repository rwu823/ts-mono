import { createGraphQLSchema } from '@ts-mono/dev-react/apollo/utilsGraphQL'

import { gql } from 'apollo-server-micro'

export default createGraphQLSchema(
  gql`
    type Author {
      id: Int!
      firstName: String
      lastName: String
      books: [Book]
    }

    extend type Query {
      author: Author
    }
  `,
  {
    Query: {
      author: () => ({
        id: 1,
        firstName: 'Rocky',
        lastName: 'Wu',
      }),
    },

    Author: {
      books: (...args) => {
        console.log('Author.books', args)
        return [{ title: 'book1' }, { title: 'book2' }]
      },
    },
  },
)
