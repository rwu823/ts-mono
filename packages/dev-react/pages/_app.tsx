import 'core-js/modules/es.global-this'

import { GlobalStyle } from '@ts-mono/dev-react/components/GlobalStyles'
import { mdxRenders } from '@ts-mono/dev-react/components/mdx-renders'
import { ModalProvider } from '@ts-mono/dev-react/components/Modal'
import GA from '@ts-mono/dev-react/share/GA'
import NextApp, { AppContext } from 'next/app'
import React from 'react'
import styled, { css } from 'styled-components'

const { MDXProvider } = require('@mdx-js/react')

const Max800 = styled.div`
  ${() => css`
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1em;
  `}
`
const ga = new GA('UA-4476856-23', { debug: true })

class App extends NextApp {
  // static async getInitialProps(ctx: AppContext) {
  //   const props = await NextApp.getInitialProps(ctx)
  //   return { ...props }
  // }

  render() {
    const { Component, pageProps } = this.props

    ga.pageView()

    return (
      <MDXProvider components={mdxRenders}>
        <GlobalStyle />
        <Max800>
          <ModalProvider>
            <Component {...pageProps} />
          </ModalProvider>
        </Max800>
      </MDXProvider>
    )
  }
}

export default App
