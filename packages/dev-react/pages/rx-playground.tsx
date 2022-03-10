import React, { useCallback, useEffect, useMemo, useRef } from 'react'

import { NextPage } from 'next'

import styled from '@emotion/styled'

import {
  animationFrameScheduler,
  concat,
  EMPTY,
  forkJoin,
  fromEvent,
  merge,
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
  observeOn,
  reduce,
  share,
  shareReplay,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
  toArray,
  withLatestFrom,
} from 'rxjs/operators'

type Props = React.DOMAttributes<HTMLDivElement>
const RxPlayground: React.FC<Props> = ({ children, ...props }) => {
  const divRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={divRef} {...props}>
      <h1>RxJS Playground</h1>
    </div>
  )
}

export default RxPlayground
