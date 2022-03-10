import React from 'react'

import { css } from '@emotion/react'
import styled from '@emotion/styled'

const Div = styled.div`
  ${() => css``}
`
export type Props = {}

const StockPage: React.FC<Props & React.DOMAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => <Div {...props}>{children}</Div>

export default StockPage
