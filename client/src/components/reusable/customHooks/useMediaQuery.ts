import { useEffect, useState } from "react";

type MediaQuery = string;

const useMediaQuery = (mediaQuery: MediaQuery) => {
  
  const [isMatched, setIsMatched] = useState<boolean>(window.matchMedia(mediaQuery).matches);
  
  useEffect(() => {
    
  }, [mediaQuery, isMatched])

  return isMatched;
};

export default useMediaQuery;
