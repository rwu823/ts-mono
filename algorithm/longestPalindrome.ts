const input = 'caac'

export const longestPalindrome = (str = '') => {
  const s = [...str]

  let res = ''
  let max = 0
  let tmpStr = ''

  let noMatched = false

  for (const [i, l] of s.entries()) {
    let j = i
    tmpStr = l

    let counts = 1

    noMatched = false

    while (j < s.length) {
      if (l === s[j + 1]) {
        tmpStr = `${tmpStr}${s[j + 1]}`
      } else if (tmpStr.length % 2 === 0) {
        if (s[j - tmpStr.length] === s[j + 1]) {
          tmpStr = `${s[j - tmpStr.length]}${tmpStr}${s[j + 1]}`
        }
      } else if (
        s[i - counts] &&
        s[i + counts] &&
        s[i - counts] === s[i + counts]
      ) {
        tmpStr = `${s[i - counts]}${tmpStr}${s[i + counts]}`
      } else {
        noMatched = true
      }

      if (tmpStr.length > max) {
        max = tmpStr.length
        res = tmpStr
      }

      if (noMatched) break

      j += 1
      counts += 1
    }
  }

  return res
}

console.log(longestPalindrome(input))
