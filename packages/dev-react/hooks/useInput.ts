import React from 'react'

export const useInput = (defaultValue = '') => {
  const [value, setValue] = React.useState(defaultValue)
  const ref = React.useRef<HTMLInputElement>(null)
  const onChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(ev => {
    setValue(ev.currentTarget.value)
  }, [])

  const focus = React.useCallback(() => {
    if (ref.current) {
      ref.current.focus()
    }
  }, [])

  const clean = React.useCallback(() => {
    setValue('')
  }, [])

  return {
    props: {
      ref,
      onChange,
      value,
    },
    focus,
    clean,
    setValue,
  }
}

export default useInput
