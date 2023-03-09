import { useEffect, useMemo, useRef } from 'react'

import type { Observable } from 'rxjs'
import { Subject } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'

export const useObservable = <State extends object>(
  pipeFn: (ob$: Observable<State>) => typeof ob$,
  nextState: State,
) => {
  const ob$ = useMemo(() => new Subject<State>(), [])

  const pipeFnRef = useRef(pipeFn)

  useEffect(() => {
    const sub$ = pipeFnRef
      .current(
        ob$.pipe(
          distinctUntilChanged(
            (a, b) => JSON.stringify(a) === JSON.stringify(b),
          ),
        ),
      )
      .subscribe()

    return () => {
      sub$.unsubscribe()
    }
  }, [ob$])

  useEffect(() => {
    pipeFnRef.current = pipeFn
    ob$.next(nextState)
  })

  return ob$
}
