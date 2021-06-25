import React, { useCallback, useEffect, useMemo, useState } from 'react'

import styled, { css } from 'styled-components'

import { useImmer } from 'use-immer'

import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { initializeApollo } from '@ts-mono/dev-react/apollo'
import Form, { FormProps, Input } from '@ts-mono/dev-react/components/Form'
import { useModal } from '@ts-mono/dev-react/components/Modal'
import { DemoContainer } from '@ts-mono/dev-react/containers/DemoContainer'
import { useIntl, withIntl } from '@ts-mono/dev-react/utils'

import { gql } from '@apollo/client'

import { EChartOption } from 'echarts'
import { customRandom, nanoid, urlAlphabet } from 'nanoid'
import { forkJoin, of } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import {
  debounceTime,
  filter,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators'
import typehole from 'typehole'

import {
  useEventEmit,
  useInput,
  useIntersectionObserver,
  useWindowSize,
} from '../../hooks'
import { useECharts } from '../../hooks/useECharts'
import langs from './langs'

const Div = styled.div`
  ${() => css``}
`

// console.info([...Array(10)].map(() => customRandom(urlAlphabet, 10)))

type Props = unknown

const ModalDiv = styled.div`
  ${() => css`
    background: #fff;
    padding: 2rem;
  `}
`

const Button = () => {
  const modal = useModal()

  const Content = useMemo(
    () => (
      <ModalDiv>
        hello form modal!!!
        <button onClick={modal.close}>close</button>
      </ModalDiv>
    ),
    [modal.close],
  )

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

const Demo: React.FC<Props> = (props) => (
  <Div>
    <Head>
      <title>Demo - Page</title>
    </Head>

    <DemoContainer />
  </Div>
)
export const allPostsQueryVars = {
  skip: 0,
  first: 10,
}

export const ALL_POSTS_QUERY = gql`
  query allPosts($first: Int!, $skip: Int!) {
    allPosts(orderBy: { createdAt: desc }, first: $first, skip: $skip) {
      id
      title
      votes
      url
      createdAt
    }
    _allPostsMeta {
      count
    }
  }
`
// export const getStaticProps: GetStaticProps = async (ctx) => {
//   const apolloClient = initializeApollo()

//   await apolloClient.query({
//     query: ALL_POSTS_QUERY,
//     variables: allPostsQueryVars,
//   })

//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     },
//     revalidate: 1,
//   }
// }

export default Demo
