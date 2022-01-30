import {
  $cacheControl,
  createGraphQLSchema,
} from '@ts-mono/dev-react/apollo/graphqlUtils'

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
      emojis: (_, _vars, { dataSources }) => dataSources.githubRaw.getEmojis(),
    },
  },
)
