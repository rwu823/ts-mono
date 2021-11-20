import 'core-js/modules/es.global-this'
import 'modern-normalize/modern-normalize.css'

import React, { useEffect } from 'react'

// import styled, { css } from 'styled-components'
import { AppProps } from 'next/app'

import { useApollo } from '@ts-mono/dev-react/apollo/useApollo'
import { mdxRenders } from '@ts-mono/dev-react/components/Markdown.mdxRenders'
import { ModalProvider } from '@ts-mono/dev-react/components/Modal'
import { TheGlobalStyles } from '@ts-mono/dev-react/components/TheGlobalStyles'
import Ga from '@ts-mono/dev-react/share/Ga'

import { ApolloProvider } from '@apollo/client'

import {
  chakra,
  ChakraProvider,
  css,
  extendTheme,
  ThemeConfig,
} from '@chakra-ui/react'
import { MDXProvider } from '@mdx-js/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({ config })

const Max800 = chakra('div', {
  baseStyle: {
    p: '0 1em',
    m: '0 auto',
    maxW: 800,
    // margin: 0 auto;
    // max-width: 800px;
    // padding: 0 1em;
  },
})

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
          <ChakraProvider resetCSS={false} theme={theme}>
            <Max800>
              <Component {...pageProps} />
            </Max800>
          </ChakraProvider>
        </ApolloProvider>
      </ModalProvider>
    </MDXProvider>
  )
}

export default App
