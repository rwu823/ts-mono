import React from 'react'
import styled, { css } from 'styled-components'

const StyledButton = styled.button`
  ${() => css`
    color: red;
  `}
`
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {}

export const Button: React.FC<Props> = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
)

export default Button
