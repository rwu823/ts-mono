import { useRef, useState, useEffect } from 'react'

const FPS60 = 1000 / 60

const perf = () => {
  if ('performance' in window) {
    return performance
  }

  return Date
}

export const useCountUp = (to: number, { duration = 750 } = {}) => {
  const timer = useRef(0)
  const [n, setN] = useState(0)

  useEffect(() => {
    const start = perf().now()
    const diff = to - n
    const count = duration / FPS60

    const countUp = () => {
      if (perf().now() - start >= duration) {
        setN(to)
      } else {
        setN((prev) =>
          Math.min(to, prev + Math.max(1, Math.floor(diff / count))),
        )
        timer.current = requestAnimationFrame(countUp)
      }
    }

    countUp()

    return () => cancelAnimationFrame(timer.current)
  }, [n, duration, to])

  return n
}

export default useCountUp
