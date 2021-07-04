import 'core-js/modules/es.global-this'

import React, { useEffect } from 'react'

import styled, { css } from 'styled-components'

import { AppProps } from 'next/app'

import { useApollo } from '@ts-mono/dev-react/apollo/useApollo'
import { mdxRenders } from '@ts-mono/dev-react/components/Markdown.mdxRenders'
import { ModalProvider } from '@ts-mono/dev-react/components/Modal'
import { TheGlobalStyles } from '@ts-mono/dev-react/components/TheGlobalStyles'
import Ga from '@ts-mono/dev-react/share/Ga'

import { ApolloProvider } from '@apollo/client'

import { MDXProvider } from '@mdx-js/react'

const Max800 = styled.div`
  ${() => css`
    margin: 0 auto;
    max-width: 800px;
    padding: 0 1em;
  `}
`

const ga = new Ga('UA-4476856-23', { debug: true })

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    ga.pageView()
  })

  const apolloClient = useApollo({ name: 'Rocky' })

  return (
    <MDXProvider components={mdxRenders}>
      <TheGlobalStyles />
      <Max800>
        <ModalProvider>
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </ModalProvider>
      </Max800>
    </MDXProvider>
  )
}

export default App
