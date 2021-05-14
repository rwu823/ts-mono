import { useEffect, useRef, useState } from 'react'

export const useIntersectionObserver = <T extends HTMLElement>(
  onceIntersectingOrThreshold?: boolean | IntersectionObserverInit['threshold'],
) => {
  const ref = useRef<T>(null)
  const ioRef = useRef<IntersectionObserver>()
  const optionsRef = useRef<IntersectionObserverInit>({})
  const [entry, setEntry] = useState<IntersectionObserverEntry>()

  const isOnce =
    typeof onceIntersectingOrThreshold === 'boolean' &&
    onceIntersectingOrThreshold

  if (!isOnce) {
    optionsRef.current = {
      threshold:
        onceIntersectingOrThreshold as IntersectionObserverInit['threshold'],
    }
  }

  useEffect(() => {
    // eslint-disable-next-line compat/compat
    ioRef.current = new IntersectionObserver(([e]) => {
      setEntry(e)
      if (isOnce && e.intersectionRatio > 0) {
        ioRef.current?.disconnect()
      }
    }, optionsRef.current)

    if (ref.current) {
      ioRef.current.observe(ref.current)
    }

    return () => ioRef.current?.disconnect()
  }, [isOnce])

  return { ref, entry, instance: ioRef.current }
}

export default useIntersectionObserver
