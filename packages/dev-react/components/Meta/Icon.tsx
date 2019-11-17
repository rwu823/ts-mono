import React from 'react'
import Head from 'next/head'

type Props = {
  href: string
}

export const IconMeta: React.FunctionComponent<Props> = ({ href }) => {
  return (
    <Head>
      <link rel="icon" sizes="192x192" href={href} />
      <link rel="apple-touch-icon" href={href} />
      <link rel="mask-icon" href={href} />
    </Head>
  )
}

export default IconMeta
