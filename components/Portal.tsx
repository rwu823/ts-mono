import React from 'react'
import { createPortal } from 'react-dom'

type Props = {
  element?: HTMLElement | null
}

const Portal: React.FC<Props> = ({
  children,
  element = globalThis.document?.fullscreenElement ?? globalThis.document?.body,
}) => (element ? createPortal(children, element) : <>{children}</>)

export default Portal
