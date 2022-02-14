import React from 'react'

import styled, { css } from 'styled-components'

import DemoContainerChild from '@ts-mono/dev-react/containers/DemoContainerChild'

const Div = styled.div`
  ${() => css``}
`
export type Props = Partial<{
  n: number
  foo: string
  bar: number
}>

export const DemoContainer: React.FC<
  Props & React.DOMAttributes<HTMLDivElement>
> = ({ children, n, ...props }) => {
  console.log('demo container render')

  return (
    <Div {...props}>
      <h1>DemoContainer</h1>

      <DemoContainerChild>
        {n}-{children}
      </DemoContainerChild>
    </Div>
  )
}

export default React.memo(DemoContainer)
