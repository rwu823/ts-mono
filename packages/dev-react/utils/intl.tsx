import React from 'react'
import { IntlProvider } from 'react-intl'
import { NextPage } from 'next'
import accepts from 'accepts'

export const DEFAULT_LANG = 'en'
export const SUPPORTED_LANGS = [DEFAULT_LANG, 'zh']

type GetActiveLang = (config: {
  supportedLangs: string[]
  preferLangs: string[]
}) => string | undefined

export const getActiveLang: GetActiveLang = ({
  supportedLangs,
  preferLangs,
}) => {
  preferLangs = preferLangs.map(l => l.split('-')[0])
  preferLangs = [...new Set(preferLangs)]

  const supportedLangsSet = new Set(supportedLangs)

  return preferLangs.find(l => supportedLangsSet.has(l))
}

export type Lang = {
  [locale: string]: { [id: string]: string }
}

export const intlKeys = <O extends object>(langs: O) => (id: keyof O) => ({
  id,
  defaultMessage: langs[id],
})

export const mergeLangs = (langs: Lang[]): Lang => {
  const locales = Array.from(
    new Set(
      langs.reduce<string[]>(
        (keys, lang) => keys.concat(Object.keys(lang)),
        [],
      ),
    ),
  )

  const merge = (locale: string) =>
    langs.reduce<any>((o, lang) => ({ ...o, ...lang[locale] }), {})

  return locales.reduce<Lang>(
    (o, locale) => ({
      ...o,
      [locale]: merge(locale),
    }),
    {
      en: {},
      zh: {},
    },
  )
}

type Locales = 'en' | 'zh'
export type WithIntlProps = {
  locale: Locales
}

export type HOCInject = <Props>(
  Component: React.FC<Props> & {
    getInitialProps?: NextPage['getInitialProps']
  },
  configs: {
    langs: Lang[]
  },
) => React.FC<Omit<Props, keyof WithIntlProps>>

export const withIntl: HOCInject = (Component, { langs }) => {
  const WithIntl: NextPage<any> = ({ locale, ...props }) => {
    const displayName = Component.displayName || Component.name || 'Component'

    Component.displayName = `withIntl(${displayName})`

    return (
      <IntlProvider locale={locale} messages={mergeLangs(langs)[locale]}>
        <Component {...(props as any)} />
      </IntlProvider>
    )
  }

  WithIntl.getInitialProps = async ctx => {
    let pageProps = {}
    const preferLangs: string[] = [
      (ctx.query.lang as string) ?? (ctx.query.lng as string),
    ].filter(Boolean)

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    if (ctx.req) {
      preferLangs.push(...accepts(ctx.req).languages())
    }

    const locale =
      getActiveLang({
        preferLangs,
        supportedLangs: SUPPORTED_LANGS,
      }) ?? DEFAULT_LANG

    return { ...pageProps, locale }
  }

  return WithIntl
}
