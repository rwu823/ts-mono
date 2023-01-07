import 'modern-normalize/modern-normalize.css'
import '~styles/uno.css'

// import '~icons/register'
import { useEffect } from 'react'

import type { AppProps } from 'next/app'

import { ApolloProvider } from '@apollo/client'

const ga = new Ga('UA-4476856-23', { debug: true })

import Ga from '@ts-mono/dev-react/share/Ga'

import { apolloClient } from '~apollo/client'

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    ga.pageView()
  })

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default App
