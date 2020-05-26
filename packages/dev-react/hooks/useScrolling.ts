import React, { useEffect, useRef, useState } from 'react'
export const useScrolling = (time = 250) => {
  const [isScrolling, setScrolling] = useState(false)
  const t = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      setScrolling(true)
      clearTimeout(t.current)
      t.current = setTimeout(() => {
        setScrolling(false)
      }, time)
    }
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [time])

  return isScrolling
}

export default useScrolling
