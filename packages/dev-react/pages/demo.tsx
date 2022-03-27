import React, { useEffect, useRef } from 'react'

import Head from 'next/head'

import { Box, Flex, FlexCol } from '@ts-mono/dev-react/components/Box'
import { FileUploadIcon } from '@ts-mono/dev-react/components/icons/FileUpload.icon'
import { FitScreenIcon } from '@ts-mono/dev-react/components/icons/ReadMore.icon'

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

type DemoProps = {
  spaceX: unknown
}

const Title = styled.div(
  ({ theme }) => css`
    background-color: red;
    color: blue;
    font-size: ${theme.text.xs};
  `,
)

const Demo: React.FC<DemoProps> = () => {
  const theme = useTheme()
  const svgRef = useRef<SVGSVGElement>(null)

  return (
    <div>
      <Head>
        <title>Demo - Page</title>
      </Head>

      <Title>Hello title !!!</Title>
      <FileUploadIcon fill={'yellow'} width={90} />
      <FitScreenIcon color={'green'} width={50} />

      <FlexCol>
        <Box>Hello Flex1</Box>
        <Box>Hello Flex2</Box>
      </FlexCol>
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
