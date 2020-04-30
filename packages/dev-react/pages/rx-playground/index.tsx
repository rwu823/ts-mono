import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import styled, { css } from 'styled-components'
import { NextPage } from 'next'

import { of, timer } from 'rxjs'
import { ajax } from 'rxjs/ajax'

import {
  bufferTime,
  catchError,
  concatMap,
  debounceTime,
  delay,
  exhaustMap,
  map,
  mapTo,
  mergeMap,
  retryWhen,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
} from 'rxjs/operators'

import { useObjectState } from '../../hooks'

import { Fetcher, useDebounceFetcher } from './useDebounceFetcher'
import useRxEvent from './useRxEvent'

const Div = styled.div`
  ${() => css``}
`
interface Error {
  errorCode: number
  errorMessage: string
  errorTitle: string
}

interface User {
  pushLiveStream: number
  userID: string
  openID: string
  displayName: string
  name: string
  bio: string
  picture: string
  website: string
}

type Props = React.DOMAttributes<HTMLDivElement> & {}
const RxPlayground: NextPage<Props> = ({ children, ...props }) => {
  const [s, set] = useObjectState({
    value: '',
    isLoading: false,
  })
  const fetcher = useCallback<Fetcher>((v) => {
    return ajax(`https://api-dsa.17app.co/api/v1/user/search?query=${v}`)
  }, [])

  const { data, error, loading, ...input } = useDebounceFetcher<User[], Error>(
    fetcher,
  )
  useEffect(() => {
    console.clear()
    const s$ = timer(0, 1_000)
      .pipe(
        map((val) => {
          console.log(val)
          return val
        }),

        takeWhile((n) => {
          return n !== 10
        }),
      )
      .subscribe()

    return () => s$.unsubscribe()
  }, [])

  const onChange = useRxEvent<React.ChangeEventHandler<HTMLInputElement>>(
    (ev$) =>
      ev$.pipe(
        map((e) => {
          const { value } = e.target

          set({ value })
          return value
        }),
        debounceTime(500),
        switchMap((v) => {
          set({ isLoading: true })
          return ajax(
            `https://api-dsa.17app.co/api/v1/user/search?query=${v}`,
          ).pipe(
            map(({ response }) => {
              set({ isLoading: false })
              console.log(response)
            }),
            catchError((err) => {
              set({ isLoading: false })
              return of(err)
            }),
          )
        }),
      ),
    [],
  )

  return (
    <Div {...props}>
      <h1>RxJS Playground</h1>
      <input type="text" placeholder="type something..." {...input} />

      <input type="text" value={s.value} onChange={onChange} />
      <h1>isLoading: {String(loading)}</h1>

      {error && <div style={{ color: 'red' }}>{JSON.stringify(error)}</div>}

      {!loading && !error && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </Div>
  )
}

export default RxPlayground
