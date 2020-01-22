/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'

export const useWindowSize = () => {
  if (!process.browser) return { width: 0, height: 0 }

  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const resize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener('resize', resize)

    return () => window.removeEventListener('resize', resize)
  }, [])

  return size
}

export default useWindowSize
