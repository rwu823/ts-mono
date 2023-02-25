import React from 'react'

import Head from 'next/head'

type Props = {
  href: string
}

export const MetaIcon = ({ href }: Props) => (
  <Head>
    <link href={href} rel="icon" sizes="192x192" />
    <link href={href} rel="apple-touch-icon" />
    <link href={href} rel="mask-icon" />
  </Head>
)

export default MetaIcon
