import React from 'react'
import { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient, ApolloClientOptions, InMemoryCache } from 'apollo-boost'

type ApolloConfig = Partial<ApolloClientOptions<{}>>

const create = (cfg: ApolloConfig) =>
  new ApolloClient({
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    cache: new InMemoryCache(),
    ...cfg,
  })

export const createApolloClient = (configs: ApolloConfig) => {
  let apolloClient: ReturnType<typeof create>
  const init = (cfg: ApolloConfig) => {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (!process.browser) {
      return create(cfg)
    }

    // Reuse client on the client-side
    if (!apolloClient) {
      apolloClient = create(cfg)
    }

    return apolloClient
  }

  apolloClient = init(configs)

  const withApollo = (PageComponent: NextPage, { ssr = true } = {}) => {
    const WithApollo: NextPage<any> = ({
      apolloClient: prevClient,
      apolloState,
      ...pageProps
    }) => {
      const client =
        prevClient ||
        init({
          cache: new InMemoryCache().restore(apolloState),
          ...configs,
        })

      return (
        <ApolloProvider client={client}>
          <PageComponent {...pageProps} />
        </ApolloProvider>
      )
    }

    // Set the correct displayName in development
    if (process.env.NODE_ENV !== 'production') {
      const displayName =
        PageComponent.displayName || PageComponent.name || 'Component'

      if (displayName === 'App') {
        console.warn('This withApollo HOC only works with PageComponents.')
      }

      WithApollo.displayName = `withApollo(${displayName})`
    }

    if (ssr || PageComponent.getInitialProps) {
      WithApollo.getInitialProps = async (ctx: NextPageContext) => {
        const { AppTree } = ctx

        // Run wrapped getInitialProps methods
        let pageProps = {}
        if (PageComponent.getInitialProps) {
          pageProps = await PageComponent.getInitialProps(ctx)
        }
        const client = init(configs)

        // Only on the server:
        if (typeof window === 'undefined') {
          // When redirecting, the response is finished.
          // No point in continuing to render
          if (ctx.res && ctx.res.finished) {
            return pageProps
          }

          // Only if ssr is enabled
          if (ssr) {
            try {
              // Run all GraphQL queries
              const { getDataFromTree } = await import('@apollo/react-ssr')

              await getDataFromTree(
                <AppTree
                  pageProps={{
                    ...pageProps,
                    apolloClient: client,
                  }}
                />,
              )
            } catch (error) {
              console.error('Error while running `getDataFromTree`', error)
            }

            // getDataFromTree does not call componentWillUnmount
            // head side effect therefore need to be cleared manually
            Head.rewind()
          }
        }

        // Extract query data from the Apollo store
        const apolloState = client.extract()

        return {
          ...pageProps,
          apolloState,
        }
      }
    }

    return WithApollo
  }

  return { withApollo, apolloClient }
}
