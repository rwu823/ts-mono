import Head from 'next/head'
import React from 'react'

type Props = {
  ogImg: string
  ogImgWidth: number
}

export const FacebookMeta: React.FunctionComponent<Props> = ({
  ogImg,
  ogImgWidth,
}) => (
  <Head>
    <meta property="og:image" content={ogImg} />
    <meta property="og:image:width" content={String(ogImgWidth)} />
  </Head>
)

export default FacebookMeta
