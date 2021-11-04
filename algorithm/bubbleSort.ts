const input = [5, 3, 8, 2, 1, 4]

export const bubbleSort = (arr: number[] = []) => {
  const { length } = arr
  let start = 0
  let count = 0

  while (start < length - count) {
    const left = start
    const right = start + 1

    const a = arr[left]
    const b = arr[right]

    if (b < a) {
      arr[left] = b
      arr[right] = a
    }

    start += 1

    if (start === length - count) {
      count += 1
      start = 0
    }
  }

  return arr
}
