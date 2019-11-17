import React from 'react'

export const useWindowSize = () => {
  if (!process.browser) return { width: 0, height: 0 }

  const [size, setSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  React.useEffect(() => {
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
