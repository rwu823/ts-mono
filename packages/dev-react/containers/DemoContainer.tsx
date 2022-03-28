import React from 'react'

import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { DemoContainerChild } from '@ts-mono/dev-react/containers/DemoContainerChild'

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
