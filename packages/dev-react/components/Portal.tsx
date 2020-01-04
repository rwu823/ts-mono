import React from 'react'
import { createPortal } from 'react-dom'

const globalThis = (1, eval)('this') // eslint-disable-line no-eval
const isDom = 'document' in globalThis && 'body' in globalThis.document

type Props = {
  element?: HTMLElement | null
}

const Portal: React.FC<Props> = ({
  children,
  element = isDom ? document.body : null,
}) => (isDom ? createPortal(children, element!) : <>{children}</>)

export default Portal
