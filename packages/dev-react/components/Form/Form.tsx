import React from 'react'

import { Formik, FormikConfig } from 'formik'

type Props<T extends object> = FormikConfig<T> & {}
export function Form<T extends object>({
  children,
  render,
  ...props
}: React.PropsWithChildren<Props<T>>) {
  return (
    <Formik {...props}>
      {formikProps => (
        <form onSubmit={formikProps.handleSubmit}>
          {render && render(formikProps)}
        </form>
      )}
    </Formik>
  )
}

export default Form
