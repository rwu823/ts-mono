import * as React from 'react'

import styled, { css } from 'styled-components'

const StyledButton = styled.button`
  ${() => css``}
`
type Props = {} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button: React.FC<Props> = ({ children, ...props }) => (
  <StyledButton className="btn" {...props}>
    {children}
  </StyledButton>
)

export default Button
