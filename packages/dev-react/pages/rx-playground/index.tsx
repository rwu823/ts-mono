import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import styled, { css } from 'styled-components'
import { NextPage } from 'next'

import { stringify } from 'query-string'
import { Subject, concat, forkJoin, merge, of, timer } from 'rxjs'
import { ajax } from 'rxjs/ajax'

import {
  bufferTime,
  catchError,
  combineLatest,
  concatMap,
  debounceTime,
  delay,
  exhaustMap,
  expand,
  filter,
  map,
  mapTo,
  mergeMap,
  reduce,
  retryWhen,
  shareReplay,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
  withLatestFrom,
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
    // const s$ = of(0, 1_000)
    //   .pipe(
    //     map((val) => {
    //       console.log(val, 1)
    //       throw new Error()
    //     }),

    //     retryWhen((err$) => err$.pipe(delay(2_000))),
    //   )
    //   .subscribe()

    // return () => s$.unsubscribe()
  }, [])

  const deps = [s.isLoading] as const
  const onChange = useRxEvent<
    React.ChangeEventHandler<HTMLInputElement>,
    typeof deps
  >(
    (event$, states$) =>
      event$.pipe(
        map((e) => e.currentTarget.value),
        tap((value) => set({ value })),
        debounceTime(500),
        withLatestFrom(states$),
        tap(([value, [isLoading]]) => {
          console.log(1, { value, isLoading })
        }),
        map(([value]) => value),
        tap(() => set({ isLoading: true })),
        switchMap((v) =>
          ajax(`https://api-dsa.17app.co/api/v1/user/search?query=${v}`).pipe(
            map(({ response }) => {
              console.log(response)
            }),
            catchError((err) => {
              console.log(err)
              return of(err)
            }),
            tap(() => {
              set({ isLoading: false })
            }),
          ),
        ),
      ),
    deps,
  )
  const eventSubject = useMemo(
    () => new Subject<React.ChangeEvent<HTMLInputElement>>(),
    [],
  )
  const onChange2 = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (ev) => {
      eventSubject.next(ev)
    },
    [eventSubject],
  )

  useEffect(() => {
    eventSubject
      .pipe(
        map((e) => e.currentTarget.value),
        tap((value) => set({ value })),
        debounceTime(500),
        tap(() => set({ isLoading: true })),
        tap(() => console.log(s.isLoading, 'loading')),
        switchMap((v) =>
          ajax(`https://api-dsa.17app.co/api/v1/user/search?query=${v}`).pipe(
            tap(() => set({ isLoading: false })),
            map(({ response }) => {
              console.log(response)
            }),
            catchError((err) => {
              console.log(err)
              return of(err)
            }),
          ),
        ),
      )
      .subscribe()

    return () => eventSubject.complete()
  }, [eventSubject, s.isLoading, set])

  return (
    <Div {...props}>
      <h1>RxJS Playground</h1>
      <input type="text" placeholder="type something..." {...input} />

      <input type="text" value={s.value} onChange={onChange} />
      <h1>isLoading: {String(s.isLoading)}</h1>

      {error && <div style={{ color: 'red' }}>{JSON.stringify(error)}</div>}

      {!loading && !error && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </Div>
  )
}

export default RxPlayground
