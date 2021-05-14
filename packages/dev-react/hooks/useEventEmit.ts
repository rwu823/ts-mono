import React, { useCallback, useEffect, useMemo } from 'react'

import { BehaviorSubject, Observable, Subject } from 'rxjs'

// eslint-disable-next-line react-hooks/exhaustive-deps
const useConst = <T>(anyObj: T) => useMemo<T>(() => anyObj, [])

export type Epic<T, Deps> = (
  event$: Subject<T>,
  states$: BehaviorSubject<Deps>,
) => Observable<any>

export const useEventEmit = <
  T = any,
  Deps extends React.DependencyList = React.DependencyList,
>(
  epic: Epic<T, Deps>,
  deps: Deps = [] as any,
) => {
  const subj = useConst(new Subject<T>())
  const states$ = useConst(new BehaviorSubject<Deps>(deps))

  useEffect(() => {
    states$.next(deps)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => {
    const s$ = epic(subj, states$).subscribe()

    return () => {
      s$.unsubscribe()
      subj.complete()
      states$.complete()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const emit = useCallback(
    (value?: T) => {
      subj.next(value)
    },
    [subj],
  )

  return emit
}

export default useEventEmit
