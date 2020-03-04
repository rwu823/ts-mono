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
    setState(prevState => ({
      ...prevState,
      ...(typeof newState === 'function' ? newState(prevState) : newState),
    }))
  }, [])

  return [state, set] as [T, SetStateFunc]
}

export default useObjectState
