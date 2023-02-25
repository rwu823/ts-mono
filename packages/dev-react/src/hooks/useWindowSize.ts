import { useEffect, useState } from 'react'

import { debounceTime, fromEvent } from 'rxjs'

export const useWindowSize = () => {
  const { innerWidth = 0, innerHeight = 0 } = process.browser ? window : {}

  const [size, setSize] = useState({
    width: innerWidth,
    height: innerHeight,
  })

  useEffect(() => {
    const winResize$ = fromEvent<UIEvent>(window, 'resize')
      .pipe(debounceTime(0))
      .subscribe(() => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      })

    return () => winResize$.unsubscribe()
  })

  return size
}

export default useWindowSize
