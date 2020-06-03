import React, { useEffect, useMemo } from 'react'
import { BehaviorSubject, Observable, Subject } from 'rxjs'

// eslint-disable-next-line react-hooks/exhaustive-deps
const useConst = <T>(anyObj: T) => useMemo<T>(() => anyObj, [])

export const useObservable = <
  T = any,
  Deps extends React.DependencyList = React.DependencyList
>(
  handler: (
    event$: Subject<T>,
    states$: BehaviorSubject<Deps>,
  ) => Observable<any>,
  deps: Deps = [] as any,
) => {
  const subj = useConst(new Subject<T>())
  const states$ = useConst(new BehaviorSubject<Deps>(deps))

  useEffect(() => {
    states$.next(deps)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => {
    const s$ = handler(subj, states$).subscribe()

    return () => {
      s$.unsubscribe()
      subj.complete()
      states$.complete()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return subj
}

export default useObservable
