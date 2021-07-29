import React, { useCallback, useEffect, useMemo, useState } from 'react'

import styled, { css } from 'styled-components'

import Head from 'next/head'

import { DemoContainer } from '@ts-mono/dev-react/containers/DemoContainer'
import DemoContainerChild from '@ts-mono/dev-react/containers/DemoContainerChild'

import { gql } from '@apollo/client'

const Div = styled.div`
  ${() => css``}
`

const Demo: React.FC = (props) => (
  <Div>
    <Head>
      <title>Demo - Page</title>
    </Head>

    <DemoContainer>
      <DemoContainerChild />
    </DemoContainer>
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
