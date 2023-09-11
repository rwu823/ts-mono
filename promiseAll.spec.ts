import { promiseAll } from './playground.js'

import { describe, it, expect,  } from 'bun:test'


describe('promiseAll', () => {
  it('should resolve with an array of results', async () => {
    const results = await promiseAll([Promise.resolve(1), Promise.resolve(2)])
    expect(results).toEqual([1, 2])
  })
  it('should reject if any promise rejects', async () => {
    try {
      await promiseAll([Promise.resolve(1), Promise.reject(2)])
    } catch (e) {
      expect(e).toBe(2)
    }
  })
})
