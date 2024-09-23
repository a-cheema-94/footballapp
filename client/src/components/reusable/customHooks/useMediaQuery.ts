import { useEffect, useState } from "react";

type MediaQuery = string;

// if we listen to the resize event, to get a media query match, then we need to debounce this so there are not too many unnecessary function calls slowing things down. However, if we use a change event listener on the media query object we don't need the debounce function since the function is only triggered when the match changes and not on a change in px width of the window.


const useMediaQuery = (mediaQuery: MediaQuery) => {
  
  const [isMatched, setIsMatched] = useState<boolean>(window.matchMedia(mediaQuery).matches);

  // TODO => put this function in other notes since it is useful.
  // TODO => coloured comments in VS code.
  // const debounce = (func: (...args: any[]) => void, delay: number) => {
  //   let timeout: number;
  //   // create closure to remember timeout variable and clear timeout on every call.
  //   return (...args: any[]) => {
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => func.apply(this, args), delay);
  //   }
  // }
  
  useEffect(() => {
    const mediaQueryObj = window.matchMedia(mediaQuery);
    const handleMatchChange = () => setIsMatched(mediaQueryObj.matches);

    mediaQueryObj.addEventListener('change', handleMatchChange);
    // can add change event listener to media query object to dynamically set if the screen size matches up to our query.

    return () => mediaQueryObj.removeEventListener('change', handleMatchChange);
    
  }, [mediaQuery])

  return isMatched;
};

export default useMediaQuery;
