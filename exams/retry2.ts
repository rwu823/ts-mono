/* eslint-disable filenames/match-exported */
const retry =
  (fn, { attempts = Number.POSITIVE_INFINITY, sleep = 0 } = {}) =>
  (...args) =>
    new Promise((resolve, reject) => {
      const tryTry = async () => {
        attempts -= 1

        try {
          const res = await fn(...args)
          resolve(res)
        } catch (error) {
          if (attempts > 0) {
            setTimeout(tryTry, sleep)
          } else {
            reject(error)
          }
        }
      }

      tryTry()
    })

export default retry
