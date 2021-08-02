import React, { useCallback, useEffect, useMemo, useState } from 'react'

import styled, { css } from 'styled-components'

import { GetStaticProps } from 'next'
import Head from 'next/head'

import { initializeApollo } from '@ts-mono/dev-react/apollo/useApollo'
import { DemoContainer } from '@ts-mono/dev-react/containers/DemoContainer'
import DemoContainerChild from '@ts-mono/dev-react/containers/DemoContainerChild'

import { gql } from '@apollo/client'

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
const Demo: React.FC<DemoProps> = ({ spaceX }) => (
  <Div>
    <Head>
      <title>Demo - Page</title>
    </Head>

    <DemoContainer n={1}>
      <h1>XXX</h1>
      <pre>{JSON.stringify(spaceX, null, 2)}</pre>
      <DemoContainerChild />
    </DemoContainer>
  </Div>
)

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
