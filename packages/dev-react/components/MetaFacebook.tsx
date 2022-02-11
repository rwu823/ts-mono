import React from 'react'

import Head from 'next/head'

type Props = {
  ogImg: string
  ogImgWidth: number
}

export const MetaFacebook: React.FC<Props> = ({ ogImg, ogImgWidth }) => (
  <Head>
    <meta content={ogImg} property="og:image" />
    <meta content={String(ogImgWidth)} property="og:image:width" />
  </Head>
)

export default MetaFacebook
