import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled, { css } from 'styled-components'

import echarts, { ECharts } from 'echarts/lib/echarts'

import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'zrender/lib/svg/svg'

const Div = styled.div<{ heightRatio: number }>`
  ${(p) => css`
    width: 100%;

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
  const [instance, setInstance] = useState<ECharts>()
  const ref = useRef<HTMLDivElement>(null)

  const el = useMemo(() => <Div heightRatio={heightRatio} ref={ref} />, [
    heightRatio,
  ])

  useEffect(() => {
    if (ref.current) {
      setInstance(echarts.init(ref.current, undefined, { renderer: 'svg' }))
    }
  }, [])

  useEffect(() => {
    return () => {
      if (instance) instance.dispose()
    }
  }, [instance])

  return { instance, el }
}

export default useECharts
