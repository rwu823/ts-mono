import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Observable, of, Subject } from 'rxjs'
import { AjaxResponse } from 'rxjs/ajax'
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators'
import { useObjectState } from '@ts-mono/dev-react/hooks/'

export type Fetcher = (value: string) => Observable<AjaxResponse>

export const useDebounceFetcher = <Data extends object, E = any>(
  fetcher: Fetcher,
  timeout = 500,
) => {
  const [state, setState] = useObjectState<{
    value: string
    error: any
    data: object
    loading: boolean
  }>({
    value: '',
    error: false,
    data: {},
    loading: false,
  } as any)

  const valueSub = useMemo(() => new Subject<string>(), [])

  const fetching = useCallback(() => {
    setState({
      loading: true,
      error: false,
    })
  }, [setState])

  const fetchSuccess = useCallback(
    (data) => {
      setState({
        loading: false,
        data,
      })
    },
    [setState],
  )

  const fetchFail = useCallback(
    (error) => {
      setState({
        loading: false,
        error,
      })
    },
    [setState],
  )

  useEffect(() => {
    const sub = valueSub
      .pipe(
        debounceTime(timeout),
        switchMap((v) => {
          fetching()
          return fetcher(v).pipe(
            map((res) => res),
            catchError((err) => of(err)),
          )
        }),
      )
      .subscribe(({ response, status }) => {
        if (status === 200) fetchSuccess(response)
        else fetchFail(response)
      })

    return () => sub.unsubscribe()
  }, [fetchFail, fetchSuccess, fetcher, fetching, timeout, valueSub])

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const { value } = e.target
      setState({ value })
      valueSub.next(value)
    },
    [setState, valueSub],
  )

  return {
    ...state,
    onChange,
    data: state.data as Data,
    error: state.error as E,
  }
}

export default useDebounceFetcher
