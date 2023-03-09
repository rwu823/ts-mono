import '../styles/output.css'

// import '~icons/register'
import { useEffect } from 'react'

import type { AppProps } from 'next/app'

import { ApolloProvider } from '@apollo/client'

const ga = new Ga('UA-4476856-23', { debug: true })

import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { apolloClient } from '@ts-mono/dev-react/src/apollo/client'
import Ga from '@ts-mono/dev-react/src/share/Ga'

import en from '~locales/en.json'
import ja from '~locales/ja.json'
import zhTW from '~locales/zh-TW.json'
import * as plurals from 'make-plural/plurals'

i18n.loadLocaleData('en', { plurals: plurals.en })
i18n.loadLocaleData('zh-TW', { plurals: plurals.zh })
i18n.loadLocaleData('ja', { plurals: plurals.ja })

i18n.load('en', en)
i18n.load('zh-TW', zhTW)
i18n.load('ja', ja)

const App = ({ Component, pageProps, router }: AppProps) => {
  if (router.locale) i18n.activate(router.locale)
  useEffect(() => {
    ga.pageView()
  })

  return (
    <ApolloProvider client={apolloClient}>
      <I18nProvider i18n={i18n}>
        <Component {...pageProps} />
      </I18nProvider>
    </ApolloProvider>
  )
}

export default App
