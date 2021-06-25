import React, { useContext } from 'react'

import styled, { css } from 'styled-components'

import { DemoContainerNameContext } from '@ts-mono/dev-react/containers/DemoContainerNameContext'

const Div = styled.div`
  ${() => css``}
`
export type Props = {}

export const DemoContainerChild: React.FC<
  Props & React.DOMAttributes<HTMLDivElement>
> = ({ children, ...props }) => {
  const name = useContext(DemoContainerNameContext)

  return (
    <Div {...props}>
      <h1>DemoContainerChild</h1>
      My Name: {name}
    </Div>
  )
}

export default DemoContainerChild
