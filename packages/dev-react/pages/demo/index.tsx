import Modal, {
  ModalProps,
  useModal,
} from '@ts-mono/dev-react/components/Modal'

import { withIntl, DEFAULT_LANG, useIntl } from '@ts-mono/dev-react/utils'

import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import styled, { css } from 'styled-components'
import langs from './langs'

const Div = styled.div`
  ${() => css``}
`
type Props = {}

const ModalDiv = styled.div`
  ${() => css`
    background: #fff;
    width: 700px;
    height: 3000px;
  `}
`

const ModalContent: React.FunctionComponent<{
  close: ModalProps['onClickMask']
}> = React.memo(({ close }) => {
  return (
    <ModalDiv>
      Hello Modal1.
      <div onClick={close}>close Modal</div>
    </ModalDiv>
  )
})

const Demo: NextPage<Props> = () => {
  const modal = useModal()
  const { $t } = useIntl(langs[DEFAULT_LANG])

  return (
    <Div>
      <Head>
        <title>Demo - Page</title>
      </Head>
      {$t('hello.world')}
      <Link href="/">
        <a href="/home">go home</a>
      </Link>
      Test page
      <button type="button" onClick={modal.open}>
        Open Modal
      </button>
      <Modal {...modal.props} onESC={modal.close}>
        <ModalContent close={modal.close} />
      </Modal>
    </Div>
  )
}

export default withIntl(Demo, {
  langs: [langs],
})
