import { createGraphQLSchema } from '@ts-mono/dev-react/apollo/graphqlUtils'

import { gql } from 'apollo-server-micro'

export default createGraphQLSchema(gql`
  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
    inheritMaxAge: Boolean
  ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION
`)
