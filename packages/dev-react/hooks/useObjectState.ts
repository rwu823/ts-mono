import { useState, useCallback } from 'react'
export const useObjectState = <T extends object>(
  initState: T,
): [T, (newState: Partial<T>) => void] => {
  const [state, setState] = useState(initState)

  const set = useCallback((newState: Partial<T>) => {
    setState(prevState => ({
      ...prevState,
      ...newState,
    }))
  }, [])

  return [state, set]
}

export default useObjectState
