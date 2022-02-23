import React from 'react'
import * as ReactIntl from 'react-intl'

import type { NextPage } from 'next'

import accepts from 'accepts'
import type { PrimitiveType } from 'intl-messageformat'

export const DEFAULT_LANG = 'en'
export const SUPPORTED_LANGS = [DEFAULT_LANG, 'zh']

export const intlKeys =
  <O extends Record<string, unknown>>(langs: O) =>
  (id: keyof O) => ({
    id,
    defaultMessage: langs[id],
  })

type Values = Record<
  string,
  PrimitiveType | JSX.Element | ((s: string) => JSX.Element)
>

export const useIntl = <
  O extends { [locale: string]: { [id: string]: string } },
>(
  langs: O,
  values: Values = {},
) => {
  const intl = ReactIntl.useIntl()

  return {
    ...intl,
    $t: (id: keyof O[typeof DEFAULT_LANG]) =>
      intl.formatMessage(
        {
          id: id as string,
          defaultMessage: (langs[DEFAULT_LANG] as any)[id],
        },
        values as any,
      ),
  }
}

type GetActiveLang = (config: {
  supportedLangs: string[]
  preferLangs: string[]
}) => string | undefined

export const getActiveLang: GetActiveLang = ({
  supportedLangs,
  preferLangs,
}) => {
  preferLangs = preferLangs.map((l) => l.split('-')[0])
  preferLangs = [...new Set(preferLangs)]

  const supportedLangsSet = new Set(supportedLangs)

  return preferLangs.find((l) => supportedLangsSet.has(l))
}

export type Lang = {
  [locale: string]: { [id: string]: string }
}

export const mergeLangs = (langs: Lang[]): Lang => {
  const locales = [
    ...new Set(
      langs.reduce<string[]>(
        (keys, lang) => [...keys, ...Object.keys(lang)],
        [],
      ),
    ),
  ]

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
  const WithIntl: React.FC<any> = ({ locale, ...props }) => {
    const displayName = Component.displayName || Component.name || 'Component'

    Component.displayName = `withIntl(${displayName})`

    return (
      <ReactIntl.IntlProvider
        locale={locale}
        messages={mergeLangs(langs)[locale]}
      >
        <Component {...(props as any)} />
      </ReactIntl.IntlProvider>
    )
  }

  WithIntl.getInitialProps = async (ctx) => {
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
