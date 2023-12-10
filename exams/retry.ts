type Options = Partial<{
  attempts: number
  sleep: number
}>

function retry<
  T extends (...args: any[]) => ReturnType<T>,
  Args extends Parameters<T>,
>(fn: T, { attempts = Number.POSITIVE_INFINITY, sleep = 0 }: Options = {}) {
  let lastError = null
  const tryIt = (...args) => {
    attempts -= 1
    return new Promise((resolve, reject) => {
      const catchError = () => {
        if (attempts > 0) {
          setTimeout(() => {
            tryIt(...args)
              .then(resolve)
              .catch(reject)
          }, sleep)
        } else {
          reject(lastError)
        }
      }
      try {
        Promise.resolve(fn(...args))
          .then(resolve)
          .catch((error) => {
            lastError = error
            catchError()
          })
      } catch (error) {
        lastError = error
        catchError()
      }
    })
  }

  return tryIt

  // return async (...args: Args) => {
  //   let lastError = null

  //   while (attempts-- > 0) {
  //     try {
  //       return await fn(...args)
  //     } catch (error) {
  //       lastError = error
  //       await new Promise((resolve) => setTimeout(resolve, sleep))
  //     }
  //   }

  //   if (lastError) {
  //     throw lastError
  //   }
  // }
}

export default retry
