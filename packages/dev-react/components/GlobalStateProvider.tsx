import React from 'react'

export const GlobalContext = React.createContext({})

type Props = {
  initState: object
}

class GlobalStateProvider extends React.Component<Props> {
  constructor(props: Props) {
    super(props)

    this.state = props.initState
  }

  setGlobalState = (newState = {}) => {
    this.setState(prevState => ({
      ...prevState,
      ...newState,
    }))
  }

  render() {
    const { children } = this.props
    return (
      <GlobalContext.Provider
        value={{
          state: this.state,
          setState: this.setGlobalState,
        }}
      >
        {children}
      </GlobalContext.Provider>
    )
  }
}

export default GlobalStateProvider
