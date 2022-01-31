import { makeGraphQLSchema } from '@ts-mono/dev-react/utils/apollo'

export default makeGraphQLSchema(
  (gql) => gql`
    enum CacheControlScope {
      PUBLIC
      PRIVATE
    }

    directive @cacheControl(
      maxAge: Int
      scope: CacheControlScope
      inheritMaxAge: Boolean
    ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION
  `,
)
