import React, { useCallback, useEffect, useMemo, useState } from 'react'

import styled, { css } from 'styled-components'

import { GetStaticProps } from 'next'
import Head from 'next/head'

import { initializeApollo } from '@ts-mono/dev-react/apollo/useApollo'
import { DemoContainer } from '@ts-mono/dev-react/containers/DemoContainer'
import DemoContainerChild from '@ts-mono/dev-react/containers/DemoContainerChild'
import { useDragAndDrop } from '@ts-mono/dev-react/hooks/useDragAndDrop'

import { gql } from '@apollo/client'

import { Box } from '@chakra-ui/react'

export const QUERY_SPACEX = gql`
  query Emojis {
    users {
      name
      age
    }
  }
`

type DemoProps = {
  spaceX: unknown
}

const Drag = styled.div`
  ${() => css`
    position: fixed;
    background-color: red;
    cursor: move;
    display: inline-block;
  `}
`

const Demo: React.FC<DemoProps> = () => {
  const { ref, style } = useDragAndDrop({
    paddingTop: 70,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
  })

  return (
    <Box bg={'red'} p={20}>
      <Head>
        <title>Demo - Page</title>
      </Head>
      <DemoContainer />
      <Drag ref={ref} style={style}>
        hello drag
      </Drag>
    </Box>
  )
}

export const getStaticProps: GetStaticProps = async () => {
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
