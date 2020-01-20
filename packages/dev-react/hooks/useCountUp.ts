import React, { useRef, useState } from 'react'

type Options = {
  duration: number
}

const fps60 = 1000 / 60
export const useCountUp = (to: number, options?: Partial<Options>) => {
  const opts: Options = {
    duration: 750,
    ...options,
  }

  const timer = useRef(0)
  const [n, setN] = useState(0)

  React.useEffect(() => {
    const start = performance.now()
    const diff = to - n
    const count = opts.duration / fps60

    const countUp = () => {
      if (performance.now() - start > opts.duration) {
        setN(to)
      } else {
        setN(prev => Math.min(to, prev + Math.max(1, Math.floor(diff / count))))
        timer.current = requestAnimationFrame(countUp)
      }
    }

    countUp()

    return () => cancelAnimationFrame(timer.current)
  }, [to])

  return n
}

export default useCountUp
