import React, { useEffect, useCallback, useContext, useReducer } from 'react'
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
  onESC?: ((ev: KeyboardEvent) => void) | boolean
  onClickMask?: (e: React.MouseEvent) => void
  top?: number
}

const Modal: React.FunctionComponent<ModalProps> = ({
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
    e => {
      e.stopPropagation()
    },
    [],
  )

  return isOpened ? (
    <Portal>
      <ModalStyle />
      <ModalBox {...props} onClick={onClickMask}>
        <ModalContent top={top} onClick={stopPropagation}>
          {children}
        </ModalContent>
      </ModalBox>
    </Portal>
  ) : null
}

const act = (type: Type, payload?: any) => ({ type, payload })

const initState: ModalProps = {
  isOpened: false,
}

enum Type {
  OPEN_MODAL = 'OPEN_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
}

type InitState = typeof initState

type Action = {
  type: Type
  payload?: any
}

const reducer: React.Reducer<InitState, Action> = (
  state,
  { type, payload },
) => {
  let newState: Partial<InitState>

  switch (type) {
    case Type.OPEN_MODAL: {
      newState = {
        ...payload,
        isOpened: true,
      }

      break
    }

    case Type.CLOSE_MODAL: {
      newState = {
        isOpened: false,
      }
      break
    }

    default:
      return state
  }

  return {
    ...state,
    ...newState,
  }
}

type ModalContextProps = ModalProps & {
  open: (
    children: React.ReactNode,
    props?: OmitType<ModalProps, 'isOpened'>,
  ) => void
  close: () => void
}

const ModalContext = React.createContext<ModalContextProps>({} as any)

export const useModal = (
  modalProps?: OmitType<ModalProps, 'isOpened'>,
): ModalContextProps => {
  const ctxModalProps = useContext(ModalContext)

  return {
    ...ctxModalProps,
    open: (children, props) =>
      ctxModalProps.open(children, {
        ...modalProps,
        ...props,
      }),
  }
}

export const ModalProvider: React.FC<{
  values?: ModalProps
}> = ({ children, values }) => {
  const [modalState, dispatch] = useReducer(reducer, initState)

  const open = useCallback<ModalContextProps['open']>((c, openModalProps) => {
    dispatch(
      act(Type.OPEN_MODAL, {
        ...values,
        ...openModalProps,
        children: c,
      }),
    )
  }, [])

  const close = useCallback<ModalContextProps['close']>(() => {
    dispatch(act(Type.CLOSE_MODAL))
  }, [])

  return (
    <ModalContext.Provider
      value={{
        ...modalState,
        open,
        close,
      }}
    >
      <Modal {...values} {...modalState} />
      {children}
    </ModalContext.Provider>
  )
}

export default Modal
