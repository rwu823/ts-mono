import { useCallback, useState } from 'react'

export const useForceUpdate = () => {
  const [, setForceUpdate] = useState({})

  const forceUpdate = useCallback(() => {
    setForceUpdate({})
  }, [])

  return forceUpdate
}
