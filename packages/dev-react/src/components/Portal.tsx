import type { PropsWithChildren } from 'react'
import React from 'react'
import { createPortal } from 'react-dom'

type Props = {
  element?: Element | HTMLElement | null
}

const Portal = ({
  children,
  element = globalThis.document?.fullscreenElement ?? globalThis.document?.body,
}: PropsWithChildren<Props>) =>
  element ? createPortal(children, element) : <>{children}</>

export default Portal
