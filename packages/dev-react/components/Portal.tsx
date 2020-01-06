import React from 'react'
import { createPortal } from 'react-dom'

const globalThis = (1, eval)('this') // eslint-disable-line no-eval

type Props = {
  element?: HTMLElement | null
}

const Portal: React.FC<Props> = ({
  children,
  element = globalThis.document?.body ?? null,
}) => (element ? createPortal(children, element) : <>{children}</>)

export default Portal
