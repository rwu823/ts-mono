import React, { useMemo, useCallback, useEffect } from 'react'
import { Subject, Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'

export const useRxEvent = <T extends React.ChangeEventHandler<Element>>(
  emit: (subject: Subject<Parameters<T>[0]>) => Observable<any>,
  deps: any[] = [],
) => {
  const sub = useMemo(() => new Subject<any>(), [])

  const event = useCallback<T>(
    // @ts-ignore
    e => {
      sub.next(e)
    },
    [sub],
  )

  const onEmit = useCallback<any>(emit, deps)

  useEffect(() => {
    const s = onEmit(sub).subscribe()

    return () => s.unsubscribe()
  }, [onEmit, sub])

  return event
}

export default useRxEvent
