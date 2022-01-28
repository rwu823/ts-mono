import isomorphicFetch from 'isomorphic-unfetch'

export const fetch = (endpoint: string, config: RequestInit = {}) =>
  isomorphicFetch(endpoint, config).then(async (res) => {
    const text = await res.text()

    try {
      const json = JSON.parse(text)

      if (res.ok) return json

      throw json
    } catch {
      throw text
    }
  })
