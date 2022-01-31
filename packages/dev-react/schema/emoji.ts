import { $cacheControl } from '@ts-mono/dev-react/apollo/graphqlUtils'
import {
  makeGraphQLResolver,
  makeGraphQLSchema,
} from '@ts-mono/dev-react/utils/apollo'

export default makeGraphQLSchema(
  (gql) =>
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
      emojis: makeGraphQLResolver(
        async (batch) =>
          batch.map(
            ({
              ctx: {
                dataSources: { githubRaw },
              },
            }) => githubRaw.getEmojis(),
          ),

        { debug: true },
      ),
    },
  },
)
