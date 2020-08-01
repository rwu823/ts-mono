import React, { useCallback, useRef, useState } from 'react'

export const useInput = (defaultValue = '') => {
  const [value, setValue] = useState(defaultValue)
  const ref = useRef<HTMLInputElement>(null)
  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (ev) => {
      setValue(ev.currentTarget.value)
    },
    [],
  )

  const focus = useCallback(() => {
    if (ref.current) {
      ref.current.focus()
    }
  }, [])

  const clean = useCallback(() => {
    setValue('')
  }, [])

  return {
    value,
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
