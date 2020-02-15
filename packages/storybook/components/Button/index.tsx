import * as React from 'react'
import styled, { css } from 'styled-components'

const StyledButton = styled.button`
  ${() => {
    return css``
  }}
`
type Props = {}

export const Button: React.FC<Props &
  React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>
}

export default Button
