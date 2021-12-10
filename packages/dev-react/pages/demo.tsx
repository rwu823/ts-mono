import React, { useCallback, useEffect, useMemo, useState } from 'react'

import styled, { css } from 'styled-components'

import { GetStaticProps } from 'next'
import Head from 'next/head'

import { initializeApollo } from '@ts-mono/dev-react/apollo/useApollo'
import { DemoContainer } from '@ts-mono/dev-react/containers/DemoContainer'
import DemoContainerChild from '@ts-mono/dev-react/containers/DemoContainerChild'
import { useDragAndDrop } from '@ts-mono/dev-react/hooks/useDragAndDrop'

import { gql } from '@apollo/client'

import { chakra, keyframes } from '@chakra-ui/system'

const Div = styled.div`
  ${() => css``}
`
export const QUERY_SPACEX = gql`
  {
    company {
      ceo
    }
    missions {
      name
    }
  }
`

type DemoProps = {
  spaceX: unknown
}

const Drag = styled.div<{ a: string; b: number }>`
  ${() => css`
    position: fixed;
    background-color: red;
    cursor: move;
    display: inline-block;
  `}
`

const abc = keyframes`
 0% {
   background-color: red;
 }

 100% {
   background-color: blue;
 }
`

const Demo: React.FC<DemoProps> = ({ spaceX }) => {
  const { ref, style } = useDragAndDrop({
    paddingTop: 70,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
  })

  const props = {
    n: 1,
  }

  return (
    <Div>
      <Head>
        <title>Demo - Page</title>
      </Head>

      <chakra.div
      >hello world</chakra.div>

      <Drag a>hello drag</Drag>
    </Div>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const apolloClient = initializeApollo()

  const spaceX = await apolloClient.query({
    query: QUERY_SPACEX,
    variables: {},
  })

  return {
    props: {
      spaceX,
    },
  }
}

export default Demo
