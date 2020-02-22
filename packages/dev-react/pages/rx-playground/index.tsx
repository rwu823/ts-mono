import { NextPage } from 'next'
import React, { useCallback } from 'react'
import { ajax } from 'rxjs/ajax'
import styled, { css } from 'styled-components'
import { Fetcher, useDebounceFetcher } from './useDebounceFetcher'

const Div = styled.div`
  ${() => css``}
`
type Props = React.DOMAttributes<HTMLDivElement> & {}
const RxPlayground: NextPage<Props> = ({ children, ...props }) => {
  const fetcher = useCallback<Fetcher>(
    v => ajax(`https://api-dsa.17app.co/api/v1/user/search?query=${v}`),
    [],
  )

  const { data, error, loading, ...input } = useDebounceFetcher(500, fetcher)

  return (
    <Div {...props}>
      <h1>RxJS Playground</h1>
      <input type="text" placeholder="type something..." {...input} />
      <h1>isLoading: {String(loading)}</h1>

      {error && <div style={{ color: 'red' }}>{JSON.stringify(error)}</div>}

      {!loading && !error && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </Div>
  )
}

export default RxPlayground
