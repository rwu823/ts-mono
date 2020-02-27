import { useState, useCallback } from 'react'

export const useObjectState = <T extends object>(initState: T) => {
  const [state, setState] = useState(initState)

  type SetPrevState = (prev: Partial<T>) => Partial<T>
  type NewState = Partial<T>
  type SetStateFunc = {
    (newState: NewState): void
    (setFunc: SetPrevState): void
  }

  const set = useCallback<SetStateFunc>((newState: SetPrevState | NewState) => {
    if (typeof newState === 'function') {
      setState(prevState => {
        return {
          ...prevState,
          ...newState(prevState),
        }
      })
    } else {
      setState(prevState => ({
        ...prevState,
        ...newState,
      }))
    }
  }, [])

  const getState = useCallback(
    () =>
      new Promise(resolve => {
        set(prev => {
          resolve(prev)
          return {}
        })
      }),
    [set],
  )

  return [state, set, getState] as [T, SetStateFunc, () => Promise<T>]
}

export default useObjectState
