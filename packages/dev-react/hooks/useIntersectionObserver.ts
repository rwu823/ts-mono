import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export const useIntersectionObserver = <T extends HTMLElement>(
  once = false,
) => {
  const ref = useRef<T>(null)

  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line compat/compat
    const observer = new IntersectionObserver(([entry]) => {
      const isViewed = entry.isIntersecting || entry.intersectionRatio > 0

      if (once) {
        if (isViewed) {
          setIsIntersecting(true)
          observer.disconnect()
        }
      } else {
        setIsIntersecting(isViewed)
      }
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [once])

  return { ref, isIntersecting }
}

export default useIntersectionObserver
