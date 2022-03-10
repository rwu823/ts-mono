import React, { useCallback } from 'react'
import { createPortal } from 'react-dom'

import { css } from '@emotion/react'
import styled from '@emotion/styled'

const Div = styled.div`
  ${() => css`
    background: #ccc;
  `}
`

type Props = {
  tip: React.ReactNode
}

const ToolTip: React.FC<Props> = ({ children, tip }) => {
  const [{ x, y }, setPos] = React.useState({ x: 0, y: 0 })
  const [isMouseIn, setMouseIn] = React.useState(false)

  const mousemove = (e: React.MouseEvent<HTMLDivElement>) => {
    setPos({
      x: e.pageX,
      y: e.pageY,
    })

    setMouseIn(true)
  }

  const Tip = () =>
    createPortal(
      <div
        id="__tip"
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          top: y,
          left: x,
          // stylelint-disable-next-line value-keyword-case
          opacity: isMouseIn ? 1 : 0,
        }}
      >
        {tip}
      </div>,
      document.body,
    )

  const onScroll = useCallback(() => {
    setMouseIn(false)
  }, [])

  React.useEffect(() => {
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [onScroll])

  return (
    <Div onMouseLeave={() => setMouseIn(false)} onMouseMove={mousemove}>
      {isMouseIn && <Tip />}
      {children}
    </Div>
  )
}

export default ToolTip
