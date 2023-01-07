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

  return (
    <div {...props}>
      <div key={'a'} className="text-veryCool">
        hello 2
      </div>
    </div>
  )
}

export default Demo
