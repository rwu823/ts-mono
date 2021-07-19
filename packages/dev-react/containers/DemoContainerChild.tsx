import React, { useContext } from 'react'

import styled, { css } from 'styled-components'

const Div = styled.div`
  ${() => css``}
`
export type Props = {}

export const DemoContainerChild: React.FC<
  Props & React.DOMAttributes<HTMLDivElement>
> = ({ children, ...props }) => {
  console.info('DemoContainerChild render')

  return (
    <Div {...props}>
      <h1>DemoContainerChild</h1>
    </Div>
  )
}

export default React.memo(DemoContainerChild)
