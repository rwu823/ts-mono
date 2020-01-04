import { useModal } from '@ts-mono/dev-react/components/Modal'

import { withIntl, DEFAULT_LANG, useIntl } from '@ts-mono/dev-react/utils'
import Form, { Input, FormProps } from '@ts-mono/dev-react/components/Form'

import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useMemo, useCallback } from 'react'
import styled, { css } from 'styled-components'
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
      }, [])}
    >
      Open Modal
    </button>
  )
}

const Demo: NextPage<Props> = () => {
  const { $t } = useIntl(langs[DEFAULT_LANG])

  return (
    <Div>
      <Head>
        <title>Demo - Page</title>
      </Head>
      <h2>Formik Demo</h2>
      <Form
        initialValues={initialValues}
        onSubmit={val => {
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
