type FuncWithCallback = (callback: (value: string) => void) => void

const a: FuncWithCallback = (cb) => {
  setTimeout(() => {
    cb('a')
  }, 500)
}

const b: FuncWithCallback = (cb) => {
  setTimeout(() => {
    cb('b')
  }, 2500)
}

const c: FuncWithCallback = (cb) => {
  setTimeout(() => {
    cb('c')
  }, 1500)
}

const order = (...asyncFuncs: FuncWithCallback[]) => {
  const res: string[] = []

  let totalCount = 0

  return new Promise((resolve) => {
    const callback = (value: string, index: number) => {
      totalCount += 1
      res[index] = value

      if (asyncFuncs.length === totalCount) {
        resolve(res)
      }
    }

    for (const [i, fn] of asyncFuncs.entries()) {
      fn((callbackValue) => callback(callbackValue, i))
    }
  })
}

order(b, a, c).then((r) => {
  console.log(r)
})
