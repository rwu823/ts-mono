import isomorphicFetch from 'isomorphic-unfetch'

export const fetch = (endpoint: string, config: RequestInit = {}) =>
  isomorphicFetch(endpoint, config).then(async (res) => {
    const text = await res.text()

    try {
      const json = JSON.parse(text)
      return String(res.status).startsWith('2') ? json : Promise.reject(json)
    } catch (error) {
      return Promise.reject(error)
    }
  })
