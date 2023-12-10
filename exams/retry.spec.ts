import { vi as jest } from 'vitest'

import retry from './retry.js'

it('retry sum', async () => {
  let attempts = 3
  const sum = (a, b) => {
    attempts -= 1
    return new Promise((resolve, reject) => {
      if (attempts > 0) {
        reject()
      } else {
        resolve(a + b)
      }
    })
  }

  const retriedSum = retry(sum)

  const returnValue = retriedSum(8, 9)
  await expect(returnValue).resolves.toBe(17)
})

it("resolves to input fn's value", async () => {
  // Input function with arguments a, b
  const sum = jest.fn((a: number, b: number) => {
    return a + b
  })

  // Expect correct type for the returned function
  //
  const retriedSum = retry(sum)

  expect(typeof retriedSum).toBe('function')

  // Expect correct type of return value of the retried function
  //
  const returnValue = retriedSum(8, 9)
  expect(returnValue).toBeInstanceOf(Promise)
  await expect(returnValue).resolves.toBe(17)
  expect(sum).toBeCalledTimes(1)
})

it('rejects to last error after running out of attempts', async () => {
  const fn = jest.fn(() => {
    // eslint-disable-next-line no-throw-literal
    throw 'Always error!'
  })

  const retriedFn = retry(fn, { attempts: 3 })

  await expect(retriedFn()).rejects.toBe('Always error!')
  expect(fn).toBeCalledTimes(3)
})

it('resolves async functions', async () => {
  // returns a+b after 100ms
  const asyncSum = (a: number, b: number) => {
    return new Promise((resolve) => setTimeout(() => resolve(a + b), 100))
  }

  const retriedSum = retry(asyncSum)
  await expect(retriedSum(8, 9)).resolves.toBe(17)
})

it('rejects to last rejection after running out of attempts', async () => {
  // reject with "always error!" after 100ms
  let calledTimes = 0
  const fn = () => {
    calledTimes += 1
    return new Promise((_, reject) =>
      setTimeout(() => reject(`Attempt #${calledTimes}`), 100),
    )
  }

  const retriedFn = retry(fn, { attempts: 4 })
  await expect(retriedFn()).rejects.toBe('Attempt #4')
})

it('can sleep between retries', async () => {
  // Emulate an unstable API: fails 2 times and succeeds at 3rd call
  let attempts = 3
  const getData = () => {
    attempts -= 1

    return new Promise((resolve, reject) => {
      if (attempts > 0) {
        reject()
      } else {
        resolve('Data here')
      }
    })
  }

  const robustGetData = retry(getData, { sleep: 250 })

  const startTime = Date.now()
  const data = await robustGetData()
  const duration = Date.now() - startTime

  expect(data).toBe('Data here')

  // getData is called 3 times, with 250ms between the calls.
  // Thus duration should be slightly more than 500ms.
  //
  expect(duration).toBeGreaterThanOrEqual(500)
  expect(duration).toBeLessThan(750)
})

it("multiple retried functions don't interfere with each other", async () => {
  function slowAPI(id: string) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(`Data for ID = ${id}`), 70)
    })
  }

  function alwaysFailAPI(id: string) {
    return new Promise((_, reject) => {
      setTimeout(() => reject(`Failed for ID = ${id}`), 50)
    })
  }

  const getSlowData = retry(slowAPI)
  const getFailure = retry(alwaysFailAPI, { attempts: 3 })

  const results = await Promise.allSettled([
    getSlowData('A'),
    getFailure('B'),
    getSlowData('C'),
    getFailure('D'),
  ])

  expect(results).toStrictEqual([
    { status: 'fulfilled', value: 'Data for ID = A' },
    { status: 'rejected', reason: 'Failed for ID = B' },
    { status: 'fulfilled', value: 'Data for ID = C' },
    { status: 'rejected', reason: 'Failed for ID = D' },
  ])
})
