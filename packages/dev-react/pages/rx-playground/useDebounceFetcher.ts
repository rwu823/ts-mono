import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Observable, of, Subject } from 'rxjs'
import { AjaxResponse } from 'rxjs/ajax'
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators'
export type Fetcher = (value: string) => Observable<AjaxResponse>

const initState = {
  value: '',
  error: false,
  data: {},
  loading: false,
}

type InitState = typeof initState

export const useDebounceFetcher = <T extends HTMLInputElement>(
  fetcher: Fetcher,
  timeout = 500,
) => {
  const [state, setSate] = useState(initState)
  const valueSub = useMemo(() => new Subject<string>(), [])

  const set = useCallback((newState: Partial<InitState>) => {
    setSate(prevState => ({
      ...prevState,
      ...newState,
    }))
  }, [])

  const fetching = useCallback(() => {
    set({
      loading: true,
      error: false,
    })
  }, [set])

  const fetchSuccess = useCallback(
    data => {
      set({
        loading: false,
        data,
      })
    },
    [set],
  )

  const fetchFail = useCallback(
    error => {
      set({
        loading: false,
        error,
      })
    },
    [set],
  )

  useEffect(() => {
    valueSub
      .pipe(
        debounceTime(timeout),
        switchMap(v => {
          fetching()
          return fetcher(v).pipe(
            map(res => res),
            catchError(err => of(err)),
          )
        }),
      )
      .subscribe(({ response, status }) => {
        if (status === 200) fetchSuccess(response)
        else fetchFail(response)
      })

    return () => valueSub.unsubscribe()
  }, [fetchFail, fetchSuccess, fetcher, fetching, timeout, valueSub])

  const onChange = useCallback<React.ChangeEventHandler<T>>(
    e => {
      const { value } = e.target
      set({ value })
      valueSub.next(value)
    },
    [set, valueSub],
  )

  return { ...state, onChange }
}

export default useDebounceFetcher
