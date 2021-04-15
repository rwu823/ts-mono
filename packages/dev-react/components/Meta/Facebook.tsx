import Head from 'next/head'
import React from 'react'

type Props = {
  ogImg: string
  ogImgWidth: number
}

export const FacebookMeta: React.FC<Props> = ({ ogImg, ogImgWidth }) => (
  <Head>
    <meta property="og:image" content={ogImg} />
    <meta property="og:image:width" content={String(ogImgWidth)} />
  </Head>
)

export default FacebookMeta
