import React from 'react'

import Head from 'next/head'

type Props = {
  href: string
}

export const MetaIcon: React.FC<Props> = ({ href }) => (
  <Head>
    <link rel="icon" sizes="192x192" href={href} />
    <link rel="apple-touch-icon" href={href} />
    <link rel="mask-icon" href={href} />
  </Head>
)

export default MetaIcon
