import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import styled, { css } from 'styled-components'
import { NextPage } from 'next'

import { stringify } from 'query-string'
import {
  ConnectableObservable,
  MonoTypeOperatorFunction,
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
import { map1, op2 } from './rx'
const Div = styled.div`
  ${() => css``}
`
timer(0, 1000)
  .pipe(
    op2('1'),
    map((o) => {
      const x = o.a
      // o.

      return o
    }),
  )
  .subscribe(console.info)

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
