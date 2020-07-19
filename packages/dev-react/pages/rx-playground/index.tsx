import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import styled, { css } from 'styled-components'
import { NextPage } from 'next'

import { stringify } from 'query-string'
import {
  ConnectableObservable,
  Observable,
  Subject,
  concat,
  forkJoin,
  merge,
  of,
  timer,
} from 'rxjs'
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
  multicast,
  publish,
  publishReplay,
  reduce,
  refCount,
  retryWhen,
  share,
  shareReplay,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
  withLatestFrom,
} from 'rxjs/operators'

import { useObjectState } from '../../hooks'

const obs = new Observable((ob) => {
  console.log('hi')
  ob.next(1)
  ob.next(2)

  setTimeout(() => {
    ob.next(3)

    setTimeout(() => {
      ob.next(4)
      ob.complete()
    }, 2000)
  }, 500)
}).pipe(publish()) as ConnectableObservable<number>

// const sub = new Subject()

obs.subscribe(console.info)
obs.subscribe(console.info)

obs.connect()
// obs.subscribe(sub)
// obs.connect()

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

type Props = React.DOMAttributes<HTMLDivElement>
const RxPlayground: NextPage<Props> = ({ children, ...props }) => {
  const [s, set] = useObjectState({
    value: '',
    isLoading: false,
  })

  return (
    <Div {...props}>
      <h1>RxJS Playground</h1>
    </Div>
  )
}

export default RxPlayground
