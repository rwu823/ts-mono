import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled, { css } from 'styled-components'
// import { useRecoilState } from 'recoil'

import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { useImmer } from 'use-immer'

import Form, { FormProps, Input } from '@ts-mono/dev-react/components/Form'
import { useModal } from '@ts-mono/dev-react/components/Modal'

import * as state from '@ts-mono/dev-react/state'
import { useIntl, withIntl } from '@ts-mono/dev-react/utils'

import { ajax } from 'rxjs/ajax'
import { forkJoin } from 'rxjs'

import {
  debounceTime,
  filter,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators'
import { EChartOption } from 'echarts'
import {
  useEventEmit,
  useIntersectionObserver,
  useWindowSize,
} from '../../hooks'
import { useECharts } from '../../hooks/useECharts'
import langs from './langs'

const Div = styled.div`
  ${() => css``}
`
type Props = unknown

const ModalDiv = styled.div`
  ${() => css`
    background: #fff;
    padding: 2rem;
  `}
`

const initialValues = {
  name: 'Rocky',
  age: 23,
}

const Fields: React.FC<FormProps<typeof initialValues>> = ({ values }) => {
  return (
    <>
      <pre>{JSON.stringify(values, null, 2)}</pre>
      <Input name="name" isRequired />
      <Input
        type="number"
        name="age"
        onChange={(_, { setValue, value }) => {
          let n = +value || 0

          n = Math.max(-2, Math.min(99, n))
          setValue(n)
        }}
      />

      <button type="submit">Submit</button>
    </>
  )
}

const Button = () => {
  const modal = useModal()

  const Content = useMemo(() => {
    return (
      <ModalDiv>
        hello form modal!!!
        <button onClick={modal.close}>close</button>
      </ModalDiv>
    )
  }, [modal.close])

  return (
    <button
      onClick={useCallback(() => {
        modal.open(Content, {
          top: 20,
          onClickMask: modal.close,
        })
      }, [Content, modal])}
    >
      Open Modal
    </button>
  )
}

const initState = {
  once: true,
  name: 'Rocky',
  list: [...Array(200)],
  age: 30,
  address: {
    code: 106,
    info: '台北市大安區',
  },
}

type State = typeof initState

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: auto;

  > * {
    padding: 0 2em;
    box-sizing: border-box;
    flex-shrink: 0;
  }
`

const Demo: NextPage<Props> = () => {
  const { $t } = useIntl(langs)
  const size = useWindowSize()
  const [state, setState] = useImmer<State>(initState)

  useEffect(() => {
    setTimeout(() => {
      console.log('reset once')
      setState((draft) => {
        draft.once = false
      })
    }, 5000)
  }, [setState])
  const ob = useIntersectionObserver(state.once)

  const updateName = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => {
    setState((draft) => {
      draft.name = 'Erin'
    })
  }, [setState])

  const updateAddr = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => {
    setState((draft) => {
      draft.address.code = 108
    })
  }, [setState])

  const chart = useECharts()

  type Response = {
    date: number
    mc: number
    mh: number
    ml: number
    mo: number
    mv: number
  }

  const [chartsRaw, setChartsRaw] = useState<Response[]>([])

  const axis = useMemo(() => {
    const filteredRaw = chartsRaw.filter((r) => {
      const D = new Date(r.date)
      D.setTime(+D + 8 * 60 * 60 * 1000)

      return D.getUTCDay() === 3 && Math.ceil(D.getDate() / 7) === 3
    })

    return filteredRaw.reduce<{ x: string[]; y: number[] }>(
      (o, r) => {
        o.x.push(new Date(r.date).toDateString())
        o.y.push(r.mc)

        return o
      },
      {
        x: [],
        y: [],
      },
    )
  }, [chartsRaw])

  useEffect(() => {
    if (axis.x.length && axis.y.length && chart.instance) {
      chart.instance.setOption({
        tooltip: {
          axisPointer: {
            type: 'cross',
          },
          trigger: 'axis',
        },
        dataZoom: [
          {
            type: 'inside',
          },
        ],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: axis.x,
        },
        yAxis: {
          type: 'value',
          min: 7_000,
          max: 13_000,
          boundaryGap: false,
        },
        series: [
          {
            symbolSize: 10,
            type: 'line',
            data: axis.y,
          },
        ],
      })
    }
  }, [axis, chart.instance])

  return (
    <Div>
      <Head>
        <title>Demo - Page</title>
      </Head>
      <Flex>
        {[...Array(130)].map((_, i) => (
          <div>{i}</div>
        ))}
      </Flex>
      <div>{chart.el}</div>
      input
      <h2>Immer Sample {JSON.stringify(size)}</h2>
      <pre>{JSON.stringify(state)}</pre>
      <button onClick={updateName}>click name</button>
      <button onClick={updateAddr}>click addr</button>
      <h2 ref={ob.ref}>Formik Demo</h2>
      <Form
        initialValues={initialValues}
        onSubmit={(val) => {
          console.log(val)
          // debugger
        }}
        component={Fields}
      />
      {$t('hello.world')}
      <Link href="/">
        <a href="/home">go home</a>
      </Link>
      <Button />
    </Div>
  )
}

export default withIntl(Demo, {
  langs: [langs],
})
