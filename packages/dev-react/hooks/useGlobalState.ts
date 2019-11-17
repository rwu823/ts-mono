import React from 'react'
import { GlobalContext } from '../components/GlobalStateProvider'

type GlobalContextType<GlobalState extends object> = {
  state: GlobalState
  setState: (state: Partial<GlobalState>) => void
}

export const useGlobalState = <InitState extends object>(): [
  InitState,
  (state: Partial<InitState>) => void,
] => {
  const { state, setState } = React.useContext<GlobalContextType<InitState>>(
    GlobalContext as any,
  )

  return [state, setState]
}

export default useGlobalState
