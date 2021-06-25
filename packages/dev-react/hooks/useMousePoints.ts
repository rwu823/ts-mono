import React, { useCallback } from 'react'

export const useMousePoints = () => {
  const [pos, setPos] = React.useState({ x: 0, y: 0 })
  const mousemove = useCallback((e: MouseEvent) => {
    setPos({
      x: e.pageX,
      y: e.pageY,
    })
  }, [])

  React.useEffect(() => {
    document.addEventListener('mousemove', mousemove)

    return () => {
      document.removeEventListener('mousemove', mousemove)
    }
  }, [mousemove])

  return pos
}

export default useMousePoints
