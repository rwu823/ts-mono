import React from 'react'
import Head from 'next/head'

type Props = {
  ogImg: string
  ogImgWidth: number
}

export const FacebookMeta: React.FunctionComponent<Props> = ({
  ogImg,
  ogImgWidth,
}) => {
  return (
    <Head>
      <meta property="og:image" content={ogImg} />
      <meta property="og:image:width" content={String(ogImgWidth)} />
    </Head>
  )
}

export default FacebookMeta
