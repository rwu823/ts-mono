import { pipe } from './pipe'

function add1(n) {
  return n + 1
}
function double(n) {
  return n * 2
}
function add(a, b) {
  return a + b
}

it('Should performs left-to-right function composition.', () => {
  const f = pipe(add1, double)
  const result = f(3)
  expect(result).toBe(8)
})

it('Should handle multiple arguments', () => {
  const firstPipe = pipe(add, double)
  const resultOfFirstPipe = firstPipe(1, 2)
  expect(resultOfFirstPipe).toBe(6)

  const secondPipe = pipe(add, add1, double)
  const resultOfSecondPipe = secondPipe(1, 2)
  expect(resultOfSecondPipe).toBe(8)
})

it('Should handle multiple array arguments', () => {
  function concat(array1, array2) {
    return array1.concat(array2)
  }
  function addOneForEach(array) {
    return array.map((n) => n + 1)
  }
  const f = pipe(concat, addOneForEach)
  const result = f([1, 2], [3, 4])
  expect(result).toEqual([2, 3, 4, 5])
})

it('Should passes context to functions', () => {
  function plusA(val) {
    return val + this.a
  }
  function timesB(val) {
    return val * this.b
  }
  const context = {
    f: pipe(plusA, timesB),
    a: 1,
    b: 2,
  }
  expect(context.f(3)).toBe(8)
})
