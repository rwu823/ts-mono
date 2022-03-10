import React, { useContext } from 'react'

import styled, { css } from '@emotion/styled'

const Div = styled.div`
  ${() => css``}
`
export type Props = {}

export const DemoContainerChild: React.FC<
  Props & React.DOMAttributes<HTMLDivElement>
> = ({ children, ...props }) => (
  <Div {...props}>
    <h1>DemoContainerChild</h1>
    {children}
  </Div>
)

export default React.memo(DemoContainerChild)
