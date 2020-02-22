import React, {
  useCallback,
  useMemo,
  useEffect,
  useReducer,
  useRef,
} from 'react'
import { Subject, of, Observable } from 'rxjs'
import { AjaxResponse, ajax } from 'rxjs/ajax'
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
  timeout = 500,
  fetcher: Fetcher,
) => {
  const [state, dispatch] = useReducer(reducer, initState)
  const valueSub = useMemo(() => new Subject<string>(), [])

  useEffect(() => {
    const sub = valueSub
      .pipe(
        debounceTime(timeout),
        switchMap(v => {
          dispatch(act(types.FETCHING))

          return fetcher(v).pipe(
            map(({ response }) => {
              dispatch(act(types.FETCH_SUCCESS, response))
            }),
            catchError(err => {
              dispatch(act(types.FETCH_FAIL, err.response))
              return of(err)
            }),
          )
        }),
      )
      .subscribe()

    return () => sub.unsubscribe()
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
