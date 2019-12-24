import React, { useCallback, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { useField } from 'formik'

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  validate?: (val: string) => React.ReactNode | Promise<React.ReactNode> | void
  name: string
  isRequired?: boolean
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    tools: { setValue: (val: any) => void; value: any },
  ) => void
}

export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ name, validate, onChange, isRequired = false, ...props }, ref) => {
    const [field, meta] = useField({
      name,
      validate: isRequired
        ? (v: any) => {
            if (!v) return <span style={{ color: 'red' }}>* required</span>
          }
        : (validate as any),
    })

    const handleChange = useCallback<
      React.ChangeEventHandler<HTMLInputElement>
    >(e => {
      if (onChange) {
        onChange(e, {
          value: e.currentTarget.value,
          setValue: value => {
            field.onChange({
              currentTarget: {
                name: e.currentTarget.name,
                value,
              },
            })
          },
        })
      } else {
        field.onChange(e)
      }
    }, [])

    return (
      <>
        {meta.error}
        <input
          value={field.value as any}
          onChange={handleChange}
          {...props}
          ref={ref}
          name={name}
        />
      </>
    )
  },
)

export default Input
