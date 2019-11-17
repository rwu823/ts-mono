export type Lang = {
  _: { [key: string]: string }
} & {
  [lang: string]: { [key: string]: string }
}

export const intlHelper = <L extends Lang, K extends keyof L['_']>(
  langs: L,
  activeLocale: string,
) => {
  const messages = activeLocale in langs ? langs[activeLocale] : langs._

  const t = (id: K) => ({
    id,
    defaultMessage: langs._[id as string],
  })

  return {
    messages,
    t,
  }
}

export default intlHelper

export const mergeLangs = (...langs: Lang[]): Lang => {
  const locales = langs.reduce<string[]>(
    (keys, lang) => keys.concat(Object.keys(lang)),
    [],
  )

  const merge = (key: string) =>
    langs.reduce<{ [key: string]: string }>(
      (o, lang) => ({ ...o, ...lang[key] }),
      {},
    )

  return Array.from(new Set(locales)).reduce<Lang>(
    (o, key) => ({
      ...o,
      [key]: merge(key),
    }),
    { _: {} },
  )
}
