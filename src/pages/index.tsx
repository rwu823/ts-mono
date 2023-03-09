import React, { useEffect } from 'react'

import type { GetServerSideProps } from 'next'

import { gql, useQuery } from '@apollo/client'

import { i18n } from '@lingui/core'
import { defineMessage, Plural, plural, t, Trans } from '@lingui/macro'

export type DemoProps = {
  //
}

const QUERY = gql`
  query character($characterId: ID!) {
    character(id: $characterId) {
      id
      name
    }
  }
`

const Demo = ({
  ...props
}: DemoProps & React.ComponentPropsWithoutRef<'div'>) => {
  const { data, refetch, loading } = useQuery(QUERY, {
    variables: {
      characterId: 123,
    },
  })

  const unreadCount = 2

  return (
    <div
      {...props}
      className=" abc xyz flex h-[200px] flex-col text-red-500"
      onClick={(ev) => {
        console.log(111, new Date())
      }}
    >
      TailwindCSS Tester
    </div>
  )
}

export default Demo
