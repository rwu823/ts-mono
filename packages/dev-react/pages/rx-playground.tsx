import React, { useCallback, useEffect, useMemo, useRef } from 'react'

import styled, { css } from 'styled-components'

import { NextPage } from 'next'

import {
  animationFrameScheduler,
  concat,
  ConnectableObservable,
  forkJoin,
  fromEvent,
  merge,
  MonoTypeOperatorFunction,
  Observable,
  of,
  Subject,
  timer,
} from 'rxjs'
import { ajax } from 'rxjs/ajax'
import {
  bufferTime,
  catchError,
  combineLatest,
  concatAll,
  concatMap,
  debounceTime,
  delay,
  exhaustMap,
  expand,
  filter,
  map,
  mapTo,
  mergeAll,
  mergeMap,
  multicast,
  observeOn,
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
  toArray,
  withLatestFrom,
} from 'rxjs/operators'

const Div = styled.div`
  ${() => css``}
`

type Props = React.DOMAttributes<HTMLDivElement>
const RxPlayground: React.FC<Props> = ({ children, ...props }) => {
  const divRef = useRef<HTMLDivElement>(null)

  return (
    <Div ref={divRef} {...props}>
      <h1>RxJS Playground</h1>
    </Div>
  )
}

export default RxPlayground
