import React from 'react'

import { Formik, FormikConfig, FormikProps } from 'formik'

type Props = Omit<FormikConfig<{}>, 'render' | 'component'> & {
  component: React.ComponentType<any>
}

export type FormProps<Values extends object> = FormikProps<Values>

export const Form: React.FC<Props> = ({ component, ...props }) => {
  return (
    <Formik {...props}>
      {(formikProps) => (
        <form onSubmit={formikProps.handleSubmit}>
          {React.createElement(component, formikProps)}
        </form>
      )}
    </Formik>
  )
}

export default Form
