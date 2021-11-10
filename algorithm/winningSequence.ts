/**
 * 重點在於如何決定 array 第一個值
 * @param n
 * @param min
 * @param max
 * @returns
 */
export const winningSequence = (
  n = 0,
  min = 0,
  max = Number.POSITIVE_INFINITY,
) => {
  const res = []

  // 大小差的距離
  const range = max - min + 1

  // 如果個數超過距離的2倍表示不符合
  if (n > range * 2 - 1) return [-1]

  // 最好的情況機是開是最大值 -1
  let start = max - 1

  if (n > range + 1) {
    start = max - (n - range)
  }

  while (start <= max) {
    res.push(start)
    start += 1
  }

  start = max - 1
  while (start >= min && res.length !== n) {
    res.push(start)
    start -= 1
  }
  return res
}

console.log(winningSequence(5, 3, 10))
