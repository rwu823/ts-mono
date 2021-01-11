import Head from 'next/head'
import React from 'react'

type Props = {
  href: string
}

export const IconMeta: React.FunctionComponent<Props> = ({ href }) => (
  <Head>
    <link rel="icon" sizes="192x192" href={href} />
    <link rel="apple-touch-icon" href={href} />
    <link rel="mask-icon" href={href} />
  </Head>
)

export default IconMeta
