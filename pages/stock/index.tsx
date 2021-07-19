import React from 'react'

import styled, { css } from 'styled-components'

const Div = styled.div`
  ${() => css``}
`
export type Props = {}

const StockPage: React.FC<Props & React.DOMAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => <Div {...props}>{children}</Div>

export default StockPage
