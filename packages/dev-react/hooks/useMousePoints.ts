import React from 'react'

export const useMousePoints = () => {
  const [pos, setPos] = React.useState({ x: 0, y: 0 })

  React.useEffect(() => {
    const mousemove = (e: MouseEvent) => {
      setPos({
        x: e.pageX,
        y: e.pageY,
      })
    }

    document.addEventListener('mousemove', mousemove)

    return () => {
      document.removeEventListener('mousemove', mousemove)
    }
  }, [])

  return pos
}

export default useMousePoints
