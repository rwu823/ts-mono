import React, { useEffect } from 'react'

import { gql, useQuery } from '@apollo/client'

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

  console.log({ fishes, bears })

  return (
    <div
      {...props}
      className={`
        flex h-[200px] items-center justify-center text-red-300
      `}
      onClick={(ev) => {
        addBear()
      }}
    >
      123
    </div>
  )
}

export default Demo
