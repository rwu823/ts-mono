type Options = Partial<{
  attempts: number
  sleep: number
}>

function retry<
  T extends (...args: any[]) => ReturnType<T>,
  Args extends Parameters<T>,
>(fn: T, { attempts = Number.POSITIVE_INFINITY, sleep = 0 }: Options = {}) {
  return async (...args: Args) => {
    let lastError = null
    while (attempts-- > 0) {
      try {
        return await fn(...args)
      } catch (error) {
        lastError = error
        await new Promise((resolve) => setTimeout(resolve, sleep))
      }
    }
    if (lastError) {
      throw lastError
    }
  }
}

export default retry
