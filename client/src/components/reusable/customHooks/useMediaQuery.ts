import { useEffect, useState } from "react";

type MediaQuery = string;

const useMediaQuery = (mediaQuery: MediaQuery) => {
  const [isMatched, setIsMatched] = useState<boolean>(
    window.matchMedia(mediaQuery).matches
  );

  useEffect(() => {
    const mediaQueryObj = window.matchMedia(mediaQuery);
    const handleMatchChange = () => setIsMatched(mediaQueryObj.matches);

    mediaQueryObj.addEventListener("change", handleMatchChange);
    // can add change event listener to media query object to dynamically set if the screen size matches up to our query.

    return () => mediaQueryObj.removeEventListener("change", handleMatchChange);
  }, [mediaQuery]);

  return isMatched;
};

export default useMediaQuery;
