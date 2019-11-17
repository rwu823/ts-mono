import React from 'react'

export const useObjectState = <State extends object>(
  defaultState: State,
): [State, React.Dispatch<React.SetStateAction<Partial<State>>>] => {
  const [state, set] = React.useState<State>(defaultState)

  const setState: React.Dispatch<
    React.SetStateAction<Partial<State>>
  > = newState =>
    set(prevState => {
      return {
        ...prevState,
        ...newState,
      }
    })

  return [state, setState]
}

export default useObjectState
