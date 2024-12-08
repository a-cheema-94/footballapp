import { MutableRefObject, useEffect, useRef } from 'react'

type Ref<T> = MutableRefObject<T | null>

type UseContentVisibleParams = () => void

const useContentVisible = <T extends HTMLElement>(callback: UseContentVisibleParams): Ref<T> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutsideElement = (event: MouseEvent) => {
      if(ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener('click', handleClickOutsideElement);

    return () => document.removeEventListener('click', handleClickOutsideElement)
  }, [callback])


  return ref;
}

export default useContentVisible