import React, { useCallback, useEffect, useMemo } from 'react'
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

import { map } from 'rxjs/operators'
import { useWindowSize } from '../../hooks'
import { useECharts } from '../../hooks/useECharts'
import langs from './langs'

const Div = styled.div`
  ${() => css``}
`
type Props = {}

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

// const A = () => {
//   const [name, setName] = useRecoilState(state.name)
//   return <div>hello {name}</div>
// }

// const B = () => {
//   const [age, setAge] = useRecoilState(state.age)
//   return <div>You're {age} years old.</div>
// }

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
          top: 30,
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

const Demo: NextPage<Props> = () => {
  const { $t } = useIntl(langs)
  const size = useWindowSize()

  const [state, setState] = useImmer<State>(initState)

  useEffect(() => {}, [state.address])

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

  useEffect(() => {
    const ajax$ = ajax({
      url: `/api/stock`,
    })
      .pipe(
        map(({ response }) => {
          return response as Response[]
        }),
      )
      .subscribe(console.log)

    return () => ajax$.unsubscribe()
  }, [])

  useEffect(() => {
    if (chart.instance) {
      chart.instance.setOption({
        textStyle: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
        backgroundColor: '#2c343c',
        grid: {
          left: '5%',
          right: 0,
          top: '3%',
          bottom: '5%',
        },

        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              color: '#555',
              width: 1,
            },
          },
          type: 'value',
        },
        series: [
          {
            data: [320, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            lineStyle: {
              color: 'yellow',
              width: 2,
            },
          },
        ],
      })
    }
  }, [chart])

  return (
    <Div>
      <Head>
        <title>Demo - Page</title>
      </Head>

      <div>
        <h2>SEO Content</h2>
        {chart.el}
      </div>

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
