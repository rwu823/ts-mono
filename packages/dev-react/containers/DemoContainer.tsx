import React, { createContext } from 'react'

import styled, { css } from 'styled-components'

import DemoContainerChild from '@ts-mono/dev-react/containers/DemoContainerChild'

const Div = styled.div`
  ${() => css``}
`
export type Props = {}

export const DemoContainer: React.FC<
  Props & React.DOMAttributes<HTMLDivElement>
> = ({ children, ...properties }) => {
  123

  return (
    <Div {...properties}>
      <h1>DemoContainer</h1>

      <DemoContainerChild />
    </Div>
  )
}

export default DemoContainer
