import React, { useCallback, useEffect, useMemo, useRef } from 'react'

import { NextPage } from 'next'

import {
  animationFrameScheduler,
  concat,
  EMPTY,
  forkJoin,
  from,
  fromEvent,
  merge,
  Observable,
  of,
  Subject,
  timer,
} from 'rxjs'
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

const RxPlayground = ({ children, ...props }: Props) => {
  const divRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={divRef} {...props}>
      <h1>RxJS Playground</h1>
    </div>
  )
}

export default RxPlayground
