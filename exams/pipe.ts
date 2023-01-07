export const pipe = function (...fns) {
  let res

  return function (...args) {
    for (const fn of fns) {
      res = res ? fn.call(this, res) : fn.apply(this, args)
    }
    return res
  }
}
