import 'modern-normalize/modern-normalize.css'

import React, { useEffect } from 'react'

// import styled, { css } from '@emotion/styled'
import type { AppProps } from 'next/app'

import { useApollo } from '@ts-mono/dev-react/apollo/useApollo'
import { mdxRenders } from '@ts-mono/dev-react/components/Markdown.mdxRenders'
import { ModalProvider } from '@ts-mono/dev-react/components/Modal'
import { TheGlobalStyles } from '@ts-mono/dev-react/components/TheGlobalStyles'
import Ga from '@ts-mono/dev-react/share/Ga'

import { ApolloProvider } from '@apollo/client'

import styled from '@emotion/styled'
import { MDXProvider } from '@mdx-js/react'

const Max800 = styled.div`
  margin: 0 auto;
  max-width: 800px;
`

const ga = new Ga('UA-4476856-23', { debug: true })

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    ga.pageView()
  })

  const apolloClient = useApollo()

  return (
    <MDXProvider components={mdxRenders}>
      {/* <TheGlobalStyles /> */}
      <ModalProvider>
        <ApolloProvider client={apolloClient}>
          <Max800>
            <Component {...pageProps} />
          </Max800>
        </ApolloProvider>
      </ModalProvider>
    </MDXProvider>
  )
}

export default App
