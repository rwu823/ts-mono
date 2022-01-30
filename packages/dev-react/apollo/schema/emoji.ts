import {
  $cacheControl,
  createGraphQLSchema,
} from '@ts-mono/dev-react/apollo/graphqlUtils'
import { fetch } from '@ts-mono/dev-react/utils/fetch'

import { gql } from 'apollo-server-micro'

export default createGraphQLSchema(
  gql`
    type Emoji ${$cacheControl({
      maxAge: $cacheControl.hours * 8,
    })} {
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
      emojis: () => {
        console.log('emoji')
        return fetch(
          'https://raw.githubusercontent.com/github/gemoji/master/db/emoji.json',
        )
      },
    },
  },
)
