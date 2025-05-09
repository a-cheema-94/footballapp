import { useEffect, useState } from "react"

export const useLocalStorage = (defaultValue: string , key: string) => {
  const [value, setValue] = useState<string >(() => {
    const storedValue = window.localStorage.getItem(key);
    
    return storedValue == null ? defaultValue : storedValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, value)
  }, [key, value])

  return [ value, setValue ] as [typeof value, typeof setValue]
}