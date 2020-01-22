import React, { useRef, useState } from 'react'

const FPS60 = 1000 / 60

export const useCountUp = (to: number, { duration = 750 } = {}) => {
  const timer = useRef(0)
  const [n, setN] = useState(0)

  React.useEffect(() => {
    const start = performance.now()
    const diff = to - n
    const count = duration / FPS60

    const countUp = () => {
      if (performance.now() - start >= duration) {
        setN(to)
      } else {
        setN(prev => Math.min(to, prev + Math.max(1, Math.floor(diff / count))))
        timer.current = requestAnimationFrame(countUp)
      }
    }

    countUp()

    return () => cancelAnimationFrame(timer.current)
  }, [n, duration, to])

  return n
}

export default useCountUp
