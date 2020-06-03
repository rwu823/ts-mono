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

  return (
    <Div {...props}>
      <h1>RxJS Playground</h1>
    </Div>
  )
}

export default RxPlayground
