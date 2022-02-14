import {
  createGraphQLResolver,
  createGraphQLSchema,
} from '@ts-mono/dev-react/apollo/graphqlUtils'

type ApolloServerContext = {}

export const makeGraphQLSchema = createGraphQLSchema<ApolloServerContext>()
export const makeGraphQLResolver = createGraphQLResolver<ApolloServerContext>()
