import DataSourcesGitHubRaw from '@ts-mono/dev-react/apollo/DataSourcesGitHubRaw'
import {
  createGraphQLResolver,
  createGraphQLSchema,
} from '@ts-mono/dev-react/apollo/graphqlUtils'

type ApolloServerContext = {
  dataSources: {
    githubRaw: DataSourcesGitHubRaw
  }
}

export const makeGraphQLSchema = createGraphQLSchema<ApolloServerContext>()
export const makeGraphQLResolver = createGraphQLResolver<ApolloServerContext>()
