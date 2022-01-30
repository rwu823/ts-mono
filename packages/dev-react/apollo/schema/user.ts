import {
  createDataLoader,
  createGraphQLSchema,
} from '@ts-mono/dev-react/apollo/graphqlUtils'

import { gql } from 'apollo-server-micro'

export default createGraphQLSchema(
  gql`
    """
    Users's description
    """
    type User {
      id: ID!
      name: String!
      "user's age"
      age: Int!
      friends: [User]
    }

    type Query {
      users: [User]
    }
  `,
  {
    Query: {
      users: () => [
        {
          id: 1,
          name: 'Erin',
          age: 25,
        },
        {
          id: 2,
          name: 'Rocky',
          age: 30,
        },
      ],
    },

    User: {
      friends: createDataLoader<{ name: string }>(async (keys) =>
        keys.map((k) => {
          if (k.name === 'Rocky')
            return [{ name: '陳大' }, { name: '林皇' }, { name: '怡君' }]

          return [{ name: '小李' }, { name: '文君' }]
        }),
      ),
    },
  },
)
