import React, { useCallback, useContext, useEffect, useReducer } from 'react'

import { css, Global as GlobalStyles } from '@emotion/react'
import styled from '@emotion/styled'

import Portal from './Portal'

const ModalBox = styled.div`
  ${() => css`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgb(0 0 0 / 60%);
    overflow: auto;
    z-index: 9999;
  `}
`

const ModalContent = styled.div<Pick<ModalProps, 'top'>>`
  ${(p) => css`
    position: relative;
    left: 50%;
    display: inline-flex;
    margin-top: ${p.top ?? 0}vh;
    transform: translateX(-50%);
  `}
`

const ModalGlobalStyle = `
  body {
    overflow: hidden;
  }
`

enum ActionType {
  OPEN_MODAL,
  CLOSE_MODAL,
}

export type ModalProps = {
  isOpened: boolean
  onESC?: ((ev: KeyboardEvent) => void) | boolean
  onClickMask?: (e: React.MouseEvent) => void
  top?: number
}

const Modal: React.FC<ModalProps> = ({
  isOpened,
  onESC,
  onClickMask,
  children,
  top = 10,
  ...props
}) => {
  useEffect(() => {
    if (onESC) {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.which !== 27 || !isOpened) return

        if (typeof onESC === 'function') onESC(e)
      }

      window.addEventListener('keyup', handleEsc)

      return () => {
        window.removeEventListener('keyup', handleEsc)
      }
    }
  }, [isOpened, onESC])

  const stopPropagation = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    (e) => {
      e.stopPropagation()
    },
    [],
  )

  return isOpened ? (
    <Portal>
      <ModalGlobalStyle />
      <ModalBox {...props} onClick={onClickMask}>
        <ModalContent top={top} onClick={stopPropagation}>
          {children}
        </ModalContent>
      </ModalBox>
    </Portal>
  ) : null
}

const ModalContext = React.createContext<React.Dispatch<Action>>(() => null)

export const useModal = (modalProps: OmitType<ModalProps, 'isOpened'> = {}) => {
  const dispatch = useContext(ModalContext)

  const open = useCallback(
    (
      children: React.ReactNode,
      replaceProps: OmitType<ModalProps, 'isOpened'> = {},
    ) => {
      dispatch({
        type: ActionType.OPEN_MODAL,
        payload: {
          children,

          top: modalProps.top,
          onESC: modalProps.onESC,
          onClickMask: modalProps.onClickMask,
          ...replaceProps,
        },
      })
    },
    [dispatch, modalProps.top, modalProps.onESC, modalProps.onClickMask],
  )

  const close = useCallback(() => {
    dispatch({ type: ActionType.CLOSE_MODAL })
  }, [dispatch])

  return { open, close }
}

const initState = {
  isOpened: false,
  children: null as React.ReactNode,
}
type InitState = typeof initState

type Action = {
  type: ActionType
  payload?: any
}

const reducer: React.Reducer<InitState, Action> = (
  state,
  { type, payload },
) => {
  let newState = {} as Partial<InitState>
  switch (type) {
    case ActionType.OPEN_MODAL:
      newState = { isOpened: true, ...payload }
      break

    case ActionType.CLOSE_MODAL:
      newState = { isOpened: false }
      break

    default:
      return state
  }

  return { ...state, ...newState }
}

export const ModalProvider: React.FC<{
  defaultProps?: ModalProps
}> = ({ children, defaultProps = { isOpened: false } }) => {
  const [state, dispatch] = useReducer(reducer, initState)

  return (
    <ModalContext.Provider value={dispatch}>
      <Modal {...defaultProps} {...state} />
      {children}
    </ModalContext.Provider>
  )
}

export default Modal
