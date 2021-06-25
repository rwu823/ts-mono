import React, { useEffect, useMemo, useRef, useState } from 'react'

import styled, { css } from 'styled-components'

import * as echarts from 'echarts'

const Div = styled.div<{ heightRatio: number }>`
  ${(p) => css`
    width: 100%;
    height: 200px;

    &:before,
    &:after {
      content: '';
      display: block;
      clear: both;
    }

    &:before {
      float: left;
      padding-top: ${p.heightRatio * 100}%;
    }
  `}
`

export const useECharts = (heightRatio = 9 / 16) => {
  const [instance, setInstance] = useState<echarts.ECharts>()
  const ref = useRef<HTMLDivElement>(null)

  const el = useMemo(
    () => <Div heightRatio={heightRatio} ref={ref} />,
    [heightRatio],
  )

  useEffect(() => {
    if (ref.current) {
      setInstance(echarts.init(ref.current, undefined, { renderer: 'svg' }))
    }
  }, [])

  useEffect(
    () => () => {
      if (instance) instance.dispose()
    },
    [instance],
  )

  return { instance, el }
}

export default useECharts
