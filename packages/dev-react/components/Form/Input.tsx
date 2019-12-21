import React from 'react'
import styled, { css } from 'styled-components'
import { useField } from 'formik'

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  validate?: (val: string) => React.ReactNode | Promise<React.ReactNode> | void
  name: string
}

export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ name, validate, ...props }, ref) => {
    const [field, meta] = useField({
      name,
      validate: validate as any,
    })

    return (
      <>
        {meta.error}
        <input {...props} onChange={field.onChange} ref={ref} name={name} />
      </>
    )
  },
)

export default Input
