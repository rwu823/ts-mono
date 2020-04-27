import React, { useCallback, useEffect, useMemo } from 'react'
import styled, { css } from 'styled-components'

import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { useImmer } from 'use-immer'

import Form, { FormProps, Input } from '@ts-mono/dev-react/components/Form'
import { useModal } from '@ts-mono/dev-react/components/Modal'
import { useIntl, withIntl } from '@ts-mono/dev-react/utils'

import { useWindowSize } from '../../hooks'
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

  return (
    <Div>
      <Head>
        <title>Demo - Page</title>
      </Head>
      <h2>Immer Sample {JSON.stringify(size)}</h2>
      <pre>{JSON.stringify(state)}</pre>

      <div onClick={() => {
        window.open(`https://appleid.apple.com/auth/authorize?client_id=live.17&redirect_uri=https://c07ce3a4.ngrok.io/api/apple-auth&response_mode=form_post&response_type=code id_token&scope=name%20email`)
      }}>
        apple login
      </div>
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
      Test page
      <Button />
    </Div>
  )
}

export default withIntl(Demo, {
  langs: [langs],
})
