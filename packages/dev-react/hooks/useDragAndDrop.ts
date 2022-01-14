import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'

import useWindowSize from '@ts-mono/dev-react/hooks/useWindowSize'

import { fromEvent } from 'rxjs'
import { finalize, map, switchMap, takeUntil, tap } from 'rxjs/operators'

type UseDragAndDropOptions = Partial<{
  paddingTop: number
  paddingRight: number
  paddingBottom: number
  paddingLeft: number

  onStartDragging: () => void
  onStopDragging: () => void
}>

export const useDragAndDrop = <
  TargetElement extends HTMLDivElement = HTMLDivElement,
>({
  onStartDragging,
  onStopDragging,
  paddingTop = 0,
  paddingRight = 0,
  paddingBottom = 0,
  paddingLeft = 0,
}: UseDragAndDropOptions = {}) => {
  const [style, setStyle] = useState<Pick<CSSProperties, 'left' | 'top'>>({
    left: paddingLeft,
    top: paddingTop,
  })

  const [coord, setCoord] = useState<{ left: number; top: number }>({
    left: 0,
    top: 0,
  })

  const ref = useRef<TargetElement>(null)

  const startDragging = useCallback(() => {
    document.body.style.userSelect = 'none'

    if (onStartDragging) onStartDragging()
  }, [onStartDragging])

  const stopDragging = useCallback(() => {
    document.body.style.userSelect = ''

    if (onStopDragging) onStopDragging()
  }, [onStopDragging])

  useEffect(() => {
    if (!ref.current) return

    const dnd$ = fromEvent<MouseEvent>(ref.current, 'mousedown')
      .pipe(
        switchMap((targetMouseDownEvent) => {
          const target = targetMouseDownEvent.currentTarget as TargetElement

          const originPoint = {
            x: target.offsetLeft,
            y: target.offsetTop,
          }

          return fromEvent<MouseEvent>(document, 'mousemove').pipe(
            tap(startDragging),
            map((docMouseMoveEvent) => ({
              left:
                docMouseMoveEvent.pageX -
                targetMouseDownEvent.pageX +
                originPoint.x,
              top:
                docMouseMoveEvent.pageY -
                targetMouseDownEvent.pageY +
                originPoint.y,
            })),
            takeUntil(fromEvent<MouseEvent>(document, 'mouseup')),
            finalize(stopDragging),
          )
        }),
      )
      .subscribe(setCoord)

    return () => dnd$.unsubscribe()
  }, [startDragging, stopDragging])

  const winSize = useWindowSize()

  useEffect(() => {
    if (!ref.current) return

    setStyle({
      left: Math.min(
        Math.max(paddingLeft, coord.left),
        winSize.width - (ref.current.offsetWidth ?? 0) - paddingRight,
      ),

      top: Math.min(
        Math.max(paddingTop, coord.top),
        winSize.height - (ref.current.offsetHeight ?? 0) - paddingBottom,
      ),
    })
  }, [coord, winSize, paddingBottom, paddingLeft, paddingRight, paddingTop])

  return { ref, style }
}
