import React, { useCallback, useEffect, useMemo } from 'react'
import { BehaviorSubject, Observable, Subject } from 'rxjs'

// eslint-disable-next-line react-hooks/exhaustive-deps
const useConst = <T>(anyObj: T) => useMemo<T>(() => anyObj, [])

export const useRxEvent = <
  T extends React.ReactEventHandler<any>,
  Deps extends React.DependencyList
>(
  emit: (
    event$: Subject<Parameters<T>[0]>,
    states$: BehaviorSubject<Deps>,
  ) => Observable<any>,
  deps: Deps = [] as any,
) => {
  const event$ = useConst(new Subject<any>())
  const states$ = useConst(new BehaviorSubject<Deps>(deps))

  useEffect(() => {
    states$.next(deps)
  }, [deps, states$])

  const eventHandler = useCallback<T>(
    // @ts-ignore
    (e) => {
      event$.next(e)
    },
    [event$],
  )

  const onEmit = useCallback(emit, [emit])

  useEffect(() => {
    const s$ = onEmit(event$, states$).subscribe()

    return () => {
      s$.unsubscribe()
      event$.complete()
      states$.complete()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return eventHandler
}

export default useRxEvent
