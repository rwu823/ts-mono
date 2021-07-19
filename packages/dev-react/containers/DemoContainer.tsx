import React from 'react'

import styled, { css } from 'styled-components'

import DemoContainerChild from '@ts-mono/dev-react/containers/DemoContainerChild'

const Div = styled.div`
  ${() => css``}
`
export type Props = {
  n: number
}

export const DemoContainer: React.FC<
  Props & React.DOMAttributes<HTMLDivElement>
> = ({ children, n, ...properties }) => {
  console.log('demo container render')

  return (
    <Div {...properties}>
      <h1>DemoContainer</h1>
      {n}-{children}
    </Div>
  )
}

export default React.memo(DemoContainer)
