import { createGraphQLSchema } from '@ts-mono/dev-react/apollo/graphqlUtils'
import { fetch } from '@ts-mono/dev-react/utils/fetch'

import { gql } from 'apollo-server-micro'

export default createGraphQLSchema(
  gql`
    type Emoji {
      emoji: String
      description: String
      category: String
      unicode_version: String
      ios_version: String
      tags: [String]
      aliases: [String]
    }

    type Query {
      emojis: [Emoji]
    }
  `,
  {
    Query: {
      emojis: () =>
        fetch(
          'https://raw.githubusercontent.com/github/gemoji/master/db/emoji.json',
        ),
    },
  },
)
