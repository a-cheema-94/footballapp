import React, { useEffect, useRef } from 'react'
import { ListGroupProps } from 'react-bootstrap';

type Props = {
  close: () => void
}

const useContentVisible = (close: () => void) => {
  const ref = useRef<any>(null);

  const handleClickOutsideContent = (event: MouseEvent) => {
    if(ref.current && ref.current.contains(event.target)) {
      close();
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideContent);

    return () => document.removeEventListener('click', handleClickOutsideContent)
  }, [close]);



  return ref;
}

export default useContentVisible