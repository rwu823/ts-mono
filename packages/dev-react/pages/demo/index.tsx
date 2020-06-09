import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled, { css } from 'styled-components'
// import { useRecoilState } from 'recoil'

import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { useImmer } from 'use-immer'

import Form, { FormProps, Input } from '@ts-mono/dev-react/components/Form'
import { useModal } from '@ts-mono/dev-react/components/Modal'
import ScrollBottom, {
  Props as ScrollBottomProps,
} from '@ts-mono/dev-react/components/ScrollBottom'
import * as state from '@ts-mono/dev-react/state'
import { useIntl, withIntl } from '@ts-mono/dev-react/utils'

import { ajax } from 'rxjs/ajax'

import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators'
import { EChartOption } from 'echarts'
import { useObservable, useWindowSize } from '../../hooks'
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

  const onBottom = useCallback<ScrollBottomProps['onBottom']>(
    (isBottom: boolean) => {
      if (isBottom) {
        setState((draft) => {
          draft.list = [...draft.list, ...[...Array(100)]]
        })
      }
    },
    [setState, state.list],
  )

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

  useEffect(() => {
    setTimeout(() => {
      setChartsRaw((raw) => {
        return [
          ...raw,
          {
            date: new Date('2020-06-17T12:00:00+08:00').getTime(),
            mc: 12_222,
          },
        ]
      })
    }, 5000)
  }, [setChartsRaw])

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

  const ajaxSub = useObservable(($e) =>
    $e.pipe(
      switchMap(() => ajax(`/api/stock`)),
      tap(({ response }) => {
        const raw: Response[] = response
        setChartsRaw(raw)
      }),
    ),
  )

  useEffect(() => {
    ajaxSub.next()
  }, [ajaxSub])

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

      <h2>Immer Sample {JSON.stringify(size)}</h2>
      <pre>{JSON.stringify(state)}</pre>
      <button onClick={updateName}>click name</button>
      <button onClick={updateAddr}>click addr</button>
      <h2>Formik Demo</h2>
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
      <ScrollBottom onBottom={onBottom}>
        {state.list.map((_, i) => (
          <div key={`id-${i}`}>{i}</div>
        ))}
      </ScrollBottom>
    </Div>
  )
}

export default withIntl(Demo, {
  langs: [langs],
})
