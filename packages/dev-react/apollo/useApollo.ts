import { useMemo } from 'react'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { concatPagination } from '@apollo/client/utilities'

let apolloClient: ApolloClient<{ name: string }>

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: !process.browser,
    link: new HttpLink({
      uri: 'https://nextjs-graphql-with-prisma-simple.vercel.app/api', // Server URL (must be absolute)
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allPosts: concatPagination(),
          },
        },
      },
    }),
  })
}

export const initializeApollo = (initialState?: Record<string, any>) => {
  const nextApolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = nextApolloClient.extract()
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    nextApolloClient.cache.restore({ ...existingCache, ...initialState })
  }

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = nextApolloClient

  return nextApolloClient
}

export const useApollo = (initialState) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
