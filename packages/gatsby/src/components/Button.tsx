import React from 'react'
import styled, { css } from 'styled-components'

const StyledButton = styled.button`
  ${() => css`
    color: red;
  `}
`
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {}

export const Button: React.FC<Props> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>
}

export default Button
