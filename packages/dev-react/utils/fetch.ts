import isomorphicFetch from 'isomorphic-unfetch'

export const fetch = (endpoint: string, config: RequestInit = {}) =>
  isomorphicFetch(endpoint, config).then(async (res) => {
    const json = await res.json()

    if (String(res.status).startsWith('2')) {
      return json
    }

    return Promise.reject(json)
  })
