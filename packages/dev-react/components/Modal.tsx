import React, { useEffect, useCallback } from 'react'
import styled, { css, createGlobalStyle } from 'styled-components'
import Portal from './Portal'

const ModalBox = styled.div`
  ${() => css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 9999;
    overflow: auto;
  `}
`
const ModalContent = styled.div<Pick<ModalProps, 'top'>>`
  ${p => css`
    display: inline-block;
    display: inline-flex;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin-top: ${p.top || 0}vh;
  `}
`

const ModalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`

export type ModalProps = {
  isOpened: boolean
  onESC?: (e: KeyboardEvent) => void
  onClickMask?: (e: React.MouseEvent) => void
  top?: number
}

const Modal: React.FunctionComponent<ModalProps> = ({
  isOpened,
  onESC,
  onClickMask,
  children,
  top,
  ...props
}) => {
  if (onESC) {
    useEffect(() => {
      const onEsc = (e: KeyboardEvent) => {
        if (e.which !== 27 || !isOpened) return

        if (onESC) onESC(e)
      }

      window.addEventListener('keyup', onEsc)

      return () => {
        window.removeEventListener('keyup', onEsc)
      }
    }, [isOpened])
  }

  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }, [])

  return isOpened ? (
    <Portal>
      <ModalStyle />
      <ModalBox {...props} onClick={onClickMask || undefined}>
        <ModalContent top={top} onClick={stopPropagation}>
          {children}
        </ModalContent>
      </ModalBox>
    </Portal>
  ) : null
}

Modal.defaultProps = {
  top: 10,
}

export const useModal = () => {
  const [props, setProps] = React.useState<ModalProps>({
    isOpened: false,
  })

  const setModal = (newProps: ModalProps) => {
    setProps(prevProps => {
      return {
        ...prevProps,
        ...newProps,
      }
    })
  }

  const close = React.useCallback((e?: React.MouseEvent | KeyboardEvent) => {
    if (e) e.stopPropagation()

    setModal({ isOpened: false })
  }, [])

  const open = React.useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation()

    setModal({ isOpened: true })
  }, [])

  return {
    open,
    close,
    props,
  }
}

export default Modal
