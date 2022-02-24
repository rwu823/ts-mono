import { useMemo } from 'react'

import type { NormalizedCacheObject } from '@apollo/client'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { concatPagination } from '@apollo/client/utilities'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

const createApolloClient = () =>
  new ApolloClient({
    ssrMode: !process.browser,
    link: new HttpLink({
      uri: 'https://api.spacex.land/graphql/', // Server URL (must be absolute)
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    }),
    cache: new InMemoryCache({
      typePolicies: {},
    }),
  })

export const initializeApollo = (initialState = {}) => {
  apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = apolloClient.extract()
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    apolloClient.cache.restore({ ...initialState, ...existingCache })
  }

  return apolloClient
}

export const useApollo = (initialState = {}) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
