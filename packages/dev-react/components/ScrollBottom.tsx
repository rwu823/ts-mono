import React, { useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
const Div = styled.div`
  ${() => css`
    position: relative;
  `}
`

const IntersectionFlag = styled.div<Pick<Props, 'bottomRatio'>>`
  ${({ bottomRatio }) => css`
    position: absolute;
    bottom: ${bottomRatio};
    left: 0;
    opacity: 0;
    pointer-events: none;
    width: 1px;
  `}
`

export type Props = {
  onBottom?: (isBottom: boolean) => void
  bottomRatio?: string
}

const ScrollBottom: React.FC<Props & React.DOMAttributes<HTMLDivElement>> = ({
  children,
  onBottom,
  bottomRatio = 0,
  ...props
}) => {
  const flagRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // eslint-disable-next-line compat/compat
    const observer = new IntersectionObserver(([entry]) => {
      if (onBottom)
        onBottom(entry.isIntersecting || entry.intersectionRatio > 0)
    })

    const el = flagRef.current

    if (el) {
      observer.observe(el)

      return () => observer.disconnect()
    }
  }, [onBottom])

  return (
    <Div {...props}>
      {children}
      <IntersectionFlag ref={flagRef} />
    </Div>
  )
}

export default ScrollBottom
