import 'core-js/modules/es.global-this'

import React, { useEffect } from 'react'

import { AppProps } from 'next/app'

import styled, { css } from 'styled-components'

import { MDXProvider } from '@mdx-js/react'
import { ApolloProvider } from '@apollo/client'

import { GlobalStyle } from '@ts-mono/dev-react/components/GlobalStyles'
import { mdxRenders } from '@ts-mono/dev-react/components/mdx-renders'
import { ModalProvider } from '@ts-mono/dev-react/components/Modal'
import GA from '@ts-mono/dev-react/share/GA'
import { useApollo } from '../apollo'

const Max800 = styled.div`
  ${() => css`
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1em;
  `}
`
const ga = new GA('UA-4476856-23', { debug: true })

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    ga.pageView()
  })

  const apolloClient = useApollo({ name: 'Rocky' })

  return (
    <MDXProvider components={mdxRenders}>
      <GlobalStyle />
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
