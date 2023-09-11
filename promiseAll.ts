// create a Promise.all polyfill
export function promiseAll(promises: Promise<any>[]): Promise<any[]> {
  return new Promise((resolve, reject) => {
    let counter = 0
    const results: any[] = []
    for (let i = 0; i < promises.length; i++) {
      promises[i].then((result) => {
        counter++
        results[i] = result
        if (counter === promises.length) {
          resolve(results)
        }
      }).catch((e) => {
        reject(e)
      })
    }
  })
}
