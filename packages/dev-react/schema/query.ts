import { makeGraphQLSchema } from '@ts-mono/dev-react/utils/apollo'

export default makeGraphQLSchema(
  (gql) =>
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
