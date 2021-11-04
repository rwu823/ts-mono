const input = [1, 2, [3, 4, [5, 6]]]

export const arrayFlatten = (arr: unknown[] = []) => {
  const res: unknown[] = []

  for (const v of arr) {
    if (Array.isArray(v)) {
      res.push(...arrayFlatten(v))
    } else {
      res.push(v)
    }
  }

  return res
}
