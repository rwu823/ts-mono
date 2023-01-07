import { ApolloClient, InMemoryCache } from '@apollo/client'

export const apolloClient = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache({}).restore(globalThis.__APOLLO_STATE__ ?? {}),
  defaultOptions: {
    query: {},
    watchQuery: {},
  },
})
