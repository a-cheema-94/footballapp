import Club from "./components/Pages/Club/Club";
import Competition from "./components/Pages/Competition";
import Homepage from "./components/Pages/Homepage/Homepage";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Player from "./components/Pages/Player";
import LiveMatchStats from "./components/Pages/MatchStats/LiveMatchStats/LiveMatchStats";
import FullTimeMatchStats from "./components/Pages/MatchStats/FullTimeMatchStats/FullTimeMatchStats";
import { Route, Routes } from "react-router-dom";
import MainNavbar from "./components/Navbar/MainNavbar";
import { useEffect, useState } from "react";
import SearchPage from "./components/Navbar/searchPage/SearchPage";
import TestComponent from "./components/TestComponent";
import NavigateUpBtn from "./components/NavigateUpBtn";

function App() {
  // search state and functions
  const [search, setSearch] = useState<boolean>(false);
  const toggle = () => setSearch((prevSearch) => !prevSearch);
  const close = () => setSearch(false);

  // up nav button state
  const [showNavUpBtn, setShowNavUpBtn] = useState<boolean>(false);

  // use useEffect to clean up scroll event listener and not add it to global event listener.
  useEffect(() => {
    const scrollFunction = () => {
      if (document.documentElement.scrollTop > 40) {
        setShowNavUpBtn(true);
      } else {
        setShowNavUpBtn(false);
      }
    };

    document.addEventListener("scroll", scrollFunction);

    return () => document.removeEventListener("scroll", scrollFunction);
  }, []);

  return (
    <>
      <MainNavbar toggle={toggle} />

      {/* todo: change this */}
      <div style={{ paddingTop: `85px` }}>
        {search && <SearchPage search={search} close={close} />}
        {!search && (
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/competition" element={<Competition />} />
            <Route path="/club" element={<Club />} />
            <Route path="/player" element={<Player />} />
            <Route path="/liveMatchStats" element={<LiveMatchStats />} />
            <Route
              path="/fullTimeMatchStats"
              element={<FullTimeMatchStats />}
            />
            {/* <Route path="/test" element={<TestComponent />}/> */}
          </Routes>
        )}

        {showNavUpBtn && <NavigateUpBtn />}
      </div>
    </>
  );
}

export default App;
