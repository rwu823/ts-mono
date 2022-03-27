import type { ButtonHTMLAttributes } from 'react'
import React from 'react'

import styled from '@emotion/styled'

const StyledButton = styled.button`
  ${() => css``}
`
type Props = {} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button: React.FC<Props> = ({ children, ...props }) => (
  <StyledButton className="btn" {...props}>
    {children}
  </StyledButton>
)

export default Button
