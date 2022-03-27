import type { StyledComponent } from '@emotion/styled'

const weakMap = new WeakMap()

let uniqueId = 0

export const e = (Styled: StyledComponent<any>) => {
  let uid

  if (weakMap.has(Styled)) {
    uid = weakMap.get(Styled)
  } else {
    uid = `styled-uid${uniqueId++}`

    weakMap.set(Styled, uid)
  }

  Styled.defaultProps = Styled.defaultProps ?? {}
  Styled.defaultProps.className = [Styled.defaultProps.className, uid]
    .filter(Boolean)
    .join(' ')

  return `.${uid}`
}
