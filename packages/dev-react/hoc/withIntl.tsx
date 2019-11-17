import React from 'react'
import { IntlProvider } from 'react-intl'
import { Lang, intlHelper, mergeLangs } from '../utils'

export type WithIntlProps = {}

type HOCInject = <Props>(
  Component: React.ComponentType<Props>,
  configs: {
    lang: Lang | Lang[]
    getActiveLocale: () => string
  },
) => React.FC<Omit<Props, keyof WithIntlProps>>

export const withIntl: HOCInject = (
  Component,
  { lang, getActiveLocale },
) => props => {
  if (!Array.isArray(lang)) lang = [lang]

  const activeLocale = getActiveLocale()

  const displayName = Component.displayName || Component.name || 'Component'

  Component.displayName = `withIntl(${displayName})`

  const { messages } = intlHelper(mergeLangs(...lang), activeLocale)

  return (
    <IntlProvider locale={activeLocale} messages={messages}>
      <Component {...(props as any)} />
    </IntlProvider>
  )
}

export default withIntl
