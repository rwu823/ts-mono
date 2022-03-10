import React, { useCallback, useEffect, useMemo, useState } from 'react'

// import styled, { css } from '@emotion/styled'
import type { GetStaticProps } from 'next'
import Head from 'next/head'

import { initializeApollo } from '@ts-mono/dev-react/apollo/useApollo'
import { DemoContainer } from '@ts-mono/dev-react/containers/DemoContainer'
import { useDragAndDrop } from '@ts-mono/dev-react/hooks/useDragAndDrop'

import { gql } from '@apollo/client'

import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'

export const QUERY_SPACEX = gql`
  query Emojis {
    users {
      name
      age
    }
  }
`

const Box = styled.div`
  box-sizing: border-box;

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`
const Flex = styled(Box)`
  display: flex;
`

type DemoProps = {
  spaceX: unknown
}
const Drag = styled.div`
  ${(props) => css`
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
  console.log('redner demo')

  const theme = useTheme()

  return (
    <div>
      <Head>
        <title>Demo - Page</title>
      </Head>

      <Flex
        css={css`
          color: yellow;
        `}
      >
        <Drag>drag me</Drag>
      </Flex>
    </div>
  )
}

// export const getStaticProps: GetStaticProps = async () => {
//   const apolloClient = initializeApollo()

//   const spaceX = await apolloClient.query({
//     query: QUERY_SPACEX,
//     variables: {},
//   })

//   return {
//     props: {
//       spaceX,
//     },
//   }
// }

export default Demo
