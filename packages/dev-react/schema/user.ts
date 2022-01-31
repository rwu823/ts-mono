import {
  createDataLoader,
  createGraphQLResolver,
} from '@ts-mono/dev-react/apollo/graphqlUtils'
import {
  makeGraphQLResolver,
  makeGraphQLSchema,
} from '@ts-mono/dev-react/utils/apollo'

import DataLoader from 'dataloader'

export default makeGraphQLSchema(
  (gql) =>
    gql`
      """
      Users's description
      """
      type User {
        id: ID!
        name: String!
        "user's age"
        age: Int
        friends: [User!]!
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
      friends: makeGraphQLResolver<{ name: string }>(
        async (keys) => {
          const res = []

          for (const k of keys) {
            if (k.parent.name === 'Rocky')
              res.push([{ name: '陳大' }, { name: '林皇' }, { name: '怡君' }])
            else res.push([{ name: '小李' }, { name: '文君' }])
          }

          return res
        },
        { debug: true },
      ),
    },
  },
)
