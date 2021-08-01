import isomorphicFetch from 'isomorphic-fetch'

export const fetch = (endpoint: string, config: RequestInit = {}) =>
  isomorphicFetch(endpoint, config).then(async (res) => {
    const json = await res.json()
    console.info('fetch')
    if (String(res.status).startsWith('2')) {
      return json
    }

    return Promise.reject(json)
  })
