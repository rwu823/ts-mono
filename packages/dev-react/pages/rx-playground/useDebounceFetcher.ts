import React, {
  useCallback,
  useMemo,
  useEffect,
  useReducer,
  useRef,
} from 'react'
import { Subject, of, Observable } from 'rxjs'
import { AjaxResponse } from 'rxjs/ajax'
import { debounceTime, switchMap, catchError, map } from 'rxjs/operators'
export type Fetcher = (value: string) => Observable<AjaxResponse>

const initState = {
  value: '',
  error: false,
  data: {},
  loading: false,
}

type InitState = typeof initState
enum types {
  SET,

  FETCHING,
  FETCH_SUCCESS,
  FETCH_FAIL,
}
type Action = {
  type: types
  payload: any
}

const act = (type: types, payload?: any) => ({ type, payload })

const reducer: React.Reducer<InitState, Action> = (
  state,
  { type, payload },
) => {
  let newState: Partial<InitState> = {}

  switch (type) {
    case types.SET:
      newState = payload
      break

    case types.FETCHING:
      newState = {
        loading: true,
        error: false,
      }
      break

    case types.FETCH_SUCCESS:
      newState = {
        loading: false,
        data: payload,
      }
      break

    case types.FETCH_FAIL:
      newState = {
        loading: false,
        error: payload,
      }
      break
    default:
      return state
  }

  return {
    ...state,
    ...newState,
  }
}
export const useDebounceFetcher = <T extends HTMLInputElement>(
  fetcher: Fetcher,
  timeout = 500,
) => {
  const [state, dispatch] = useReducer(reducer, initState)
  const valueSub = useMemo(() => new Subject<string>(), [])

  useEffect(() => {
    valueSub
      .pipe(
        debounceTime(timeout),
        switchMap(v => {
          dispatch(act(types.FETCHING))

          return fetcher(v).pipe(
            map(res => res),
            catchError(err => of(err)),
          )
        }),
      )
      .subscribe(({ response, status }) => {
        dispatch(
          act(
            status === 200 ? types.FETCH_SUCCESS : types.FETCH_FAIL,
            response,
          ),
        )
      })

    return () => valueSub.unsubscribe()
  }, [fetcher, timeout, valueSub])

  const onChange = useCallback<React.ChangeEventHandler<T>>(
    e => {
      const { value } = e.target

      dispatch(act(types.SET, { value }))
      valueSub.next(value)
    },
    [valueSub],
  )

  return { ...state, onChange }
}

export default useDebounceFetcher
