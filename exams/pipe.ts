export const pipe = function (...fns) {
  let res

  return function (...args) {
    for (const fn of fns) {
      res = fn.apply(this, res ? [res] : args)
    }
    return res
  }
}
