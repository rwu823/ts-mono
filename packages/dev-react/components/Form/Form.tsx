import { Formik, FormikConfig, FormikProps } from 'formik'
import React from 'react'

type Props = Omit<FormikConfig<{}>, 'render' | 'component'> & {
  component: React.ComponentType<any>
}

export type FormProps<Values extends object> = FormikProps<Values>

export const Form: React.FC<Props> = ({ component, ...props }) => (
  <Formik {...props}>
    {(formikProps) => (
      <form onSubmit={formikProps.handleSubmit}>
        {React.createElement(component, formikProps)}
      </form>
    )}
  </Formik>
)

export default Form
